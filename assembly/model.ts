import { context, u128, PersistentVector, PersistentUnorderedMap } from "near-sdk-as";

/**
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedOrder {
  premium: boolean;
  sender: string;
  constructor(public itemId: string, public itemName: string, public userName: string, public price: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
  }
}

/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const orders = new PersistentVector<PostedOrder>("m");

/**
 * This class represents a product that can be listed on a marketplace.
 * It contains basic properties that are needed to define a product.
 * The price of the product is of type u128 that allows storing it in yocto-NEAR, where `1 yocto = 1^-24`.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level.
 */
@nearBindgen
export class Product {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  price: u128;
  owner: string;
  sold: u32;
  public static fromPayload(payload: Product): Product {
    const product = new Product();
    product.id = payload.id;
    product.name = payload.name;
    product.description = payload.description;
    product.image = payload.image;
    product.location = payload.location;
    product.price = payload.price;
    product.owner = context.sender;
    return product;
  }
  public incrementSoldAmount(): void {
    this.sold = this.sold + 1;
  }
}

/**
 * `productsStorage` - it's a key-value datastructure that is used to store products by sellers.
 * The backbone of this datastructure is {@link PersistentUnorderedMap} - a facade in front of the NEAR's {@link Storage}.
 * For the sake of this contract we've chosen {@link PersistentUnorderedMap} as a storage for the next reasons:
 * - `set`, `get` and `delete` operations have a constant time complexity - O(1)
 * - keys are stored in the blockchain (which is opposite to {@link PersistentMap})
 * - provides an interface to return a range of values
 *
 * Brakedown of the `PersistentUnorderedMap<string, Product>` datastructure:
 * - the key of `PersistentUnorderedMap` is a `productId`
 * - the value in this `PersistentUnorderedMap` is a product itself `Product` that is related to a given key (`productId`)
 */
export const productsStorage = new PersistentUnorderedMap<string, Product>("LISTED_PRODUCTS");