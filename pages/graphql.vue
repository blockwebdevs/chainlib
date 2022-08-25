<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <br>
    {{ thing }}
  </div>
</template>

<script>
import gql from 'graphql-tag'

const THING_QUERY = gql`
  query THING_QUERY($id: String!) {
    thing (where: {id: {_eq: $id}}) {
       id
    metadata {
      title
      description
      tags
      media
      category
      external_url
    }
    tokens {
      id
      minter
      list {
        price
        contractId
        ownerId
      }
    }
  }
  }
`;

export default {
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;
    const id = 'eztziXSDJ0pdkIo7Zgk9X-YrisItu7GkC5BHS23iRl8:art.mintspace2.testnet';

    const res = await client.query({
      query: THING_QUERY,
      variables: {
        id,
      },
    })

    const { thing } = res.data;

    return {
      thing,
    }
  },
}
</script>