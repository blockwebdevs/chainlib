<template>
  <div class="contacts">
    <v-img src="/Main-banner.jpeg" class="banner-search">
      <search/>
    </v-img>

    <v-container>
      <v-col class="col-md-12">
        <h1 class="text-center">SUBMIT A BOOK PROPOSAL</h1>
      </v-col>

      <v-row id="contactsForm" class=" contacts__form">
        <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          <p class="form___title mt-15">
            The service offers the facility to propose for purchase - the books, which are necessary for your activity,
            found by you in the advertisements in the media, bookstores, etc. Your request will be reviewed by us
            immediately for further completion of the library's holdings.
          </p>
        </v-col>

        <v-col class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          <h3 class="c-title my-3">
            Submit a Book Proposal
          </h3>
          <v-form
              class="contactForm text-center"
              ref="form"
              v-model="valid"
              lazy-validation
              v-if="!formSended">

            <v-select
                v-if="categories"
                :items="categories"
                item-text="translation.name"
                item-value="translation.name"
                label="Category"
                color="primary"
                outlined
                required
                v-model="form.categorySelected"
            >
            </v-select>
            <v-text-field
                v-model="form.title"
                dense outlined
                :rules="titleRules"
                label="Title"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.author"
                dense outlined
                :rules="authorRules"
                label="Author"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.secondAuthor"
                dense outlined
                :rules="secondAuthorRules"
                label="Second Author"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.illustrator"
                dense outlined
                :rules="illustratorRules"
                label="Illustrator"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.subject"
                dense outlined
                :rules="subjectRules"
                label="Subject"
                required
            ></v-text-field>
            <v-text-field
                type="number"
                v-model="form.publication"
                dense outlined
                :rules="publicationRules"
                label="Publication"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.language"
                dense outlined
                :rules="languageRules"
                label="Language"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.country"
                dense outlined
                :rules="countryRules"
                label="Country"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.isbn"
                dense outlined
                :rules="isbnRules"
                label="ISBN"
                required
            ></v-text-field>
            <v-textarea
                dense outlined
                v-model="form.description"
                :rules="descriptionRules"
                name="input-7-4"
                label="Description"
                hint="Hint text"
            ></v-textarea>
            <div class="text-left mb-4">
              <label for="image">Image</label> <br>
              <input type="file" @change="uploadImage" name="image" id="image" accept="image/*">
            </div>
            <v-text-field
                v-model="form.name"
                dense outlined
                :rules="nameRules"
                label="Your Full Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.nearAcc"
                dense outlined
                :rules="nearAccRules"
                label="Your Near Account"
                required
            ></v-text-field>
            <v-text-field
                dense outlined
                v-model="form.email"
                :rules="emailRules"
                label="Your Email"
                required
            ></v-text-field>
            <v-text-field
                dense outlined
                v-model="form.phone"
                :rules="phoneRules"
                label="Your Phone"
                required
            ></v-text-field>

            <v-btn
                @click="submitFeedback()"
                color="accent text--white"
                class="mr-4 btn-primary-text"
            >
              Submit
            </v-btn>
          </v-form>
          <v-card-text v-else>
            <v-alert
                dense
                text
                type="success"
            >
              Thank you, the book will appear online after moderation.
            </v-alert>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import contentApi from '@/api/contentApi'
import Search from "~/components/front/partials/Search";
import axios from "axios";

export default {
  layout: "default",
  components: {Search},
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    }
  },
  data: () => ({
    formSended: false,
    title: '',
    description: '',
    valid: true,
    file: '',
    form: {
      categorySelected: 1,
      title: '',
      author: '',
      secondAuthor: '',
      illustrator: '',
      publication: '',
      subject: '',
      country: '',
      language: '',
      isbn: '',
      description: '',
      name: '',
      nearAcc: '',
      email: '',
      phone: '',
      url: null,
      image: null,
    },
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 10) || 'Title must be less than 10 characters',
    ],
    authorRules: [
      v => !!v || 'Author is required',
    ],
    secondAuthorRules: [
      v => !!v || 'Second Author is required',
    ],
    illustratorRules: [
      v => !!v || 'Illustrator is required',
    ],
    publicationRules: [
      v => !!v || 'Publication is required',
    ],
    subjectRules: [
      v => !!v || 'Subject is required',
    ],
    countryRules: [
      v => !!v || 'Country is required',
    ],
    languageRules: [
      v => !!v || 'Language is required',
    ],
    isbnRules: [
      v => !!v || 'ISBN is required',
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
    ],
    imageRules: [
      v => !!v || 'Cover is required',
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    nearAccRules: [
      v => !!v || 'Near Account is required',
      v => (v && v.length <= 30) || 'Near Account must be less than 10 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    phoneRules: [
      v => !!v || 'Phone is required',
    ],
  }),
  computed: mapGetters({
    trans: 'getTranslations',
    categories: 'getCategories',
    language: 'getLanguage',
    currency: 'getCurrency'
  }),
  mounted() {
    this.title = this.$trans('PageNames', 'defaultPageSeoTitle')
    this.description = this.$trans('PageNames', 'defaultPageSeoDesc')
  },
  methods: {
    uploadImage(e) {
      this.file = e.target.files[0];
    },
    async submitFeedback() {
      if (this.$refs.form.validate()) {
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        this.form.lang = this.language.lang
        this.form.currency = this.currency.id

        const data = new FormData();
        const backURL = `${process.env.API}`

        data.append('file', this.file);
        data.append('categorySelected', this.form.categorySelected);
        data.append('title', this.form.title);
        data.append('author', this.form.author);
        data.append('secondAuthor', this.form.secondAuthor);
        data.append('illustrator', this.form.illustrator);
        data.append('publication', this.form.publication);
        data.append('subject', this.form.subject);
        data.append('country', this.form.country);
        data.append('language', this.form.language);
        data.append('description', this.form.description);
        data.append('name', this.form.name);
        data.append('nearAcc', this.form.nearAcc);
        data.append('email', this.form.email);
        data.append('phone', this.form.phone);
        data.append('url', this.form.url);
        data.append('url', this.form.url);
        data.append('nearAcc', this.form.nearAcc);

        let vm = this;

        await axios.post(`${backURL}/en/api/book`, data, config)
            .then(function (res) {
              vm.formSended = true
            })
            .catch(function (err) {
              vm.formSended = true
            });
      }
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
.c-title {
  font-size: 18px;
  padding-top: 30px;
  color: #ed6d5e !important;
}
</style>