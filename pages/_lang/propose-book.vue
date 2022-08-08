<template>
  <div class="contacts">
    <v-img src="/Main-banner.jpeg" class="banner-search">
      <div class="banner-search-wrapper">
        <input type="text" class="search-input">
        <button></button>
      </div>
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
              v-if="!formSended"
          >
            <v-text-field
                v-model="form.name"
                dense outlined
                :rules="nameRules"
                label="Title and the author"
                required
            ></v-text-field>
            <v-text-field
                v-model="form.name"
                dense outlined
                :rules="nameRules"
                :label="trans.ContactsAndForms.labelName"
                required
            ></v-text-field>
            <v-text-field
                dense outlined
                v-model="form.email"
                :rules="emailRules"
                :label="$trans('ContactsAndForms', 'labelCommunicationMethodOptionEmail')"
                required
            ></v-text-field>
            <v-text-field
                dense outlined
                v-model="form.phone"
                :rules="phoneRules"
                :label="trans.ContactsAndForms.labelPhone"
                required
            ></v-text-field>
            <v-textarea
                dense outlined
                v-model="form.message"
                name="input-7-4"
                label="Description"
                hint="Hint text"
            ></v-textarea>
            <v-btn
                @click="submitFeedback()"
                color="accent text--white"
                class="mr-4 btn-primary-text"
            >
              {{ $trans('ContactsAndForms', 'sendButton') }}
            </v-btn>
          </v-form>
          <v-card-text v-else>
            <v-alert
                dense
                text
                type="success"
            >
              Datele au fost transmise cu succes!!!
            </v-alert>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import userApi from '@/api/userApi'

export default {
  layout: "default",
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
    form: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
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
    // user: 'chat/getUser',
  }),
  mounted() {
    this.title = this.$trans('PageNames', 'defaultPageSeoTitle')
    this.description = this.$trans('PageNames', 'defaultPageSeoDesc')
  },
  methods: {
    submitFeedback() {
      if (this.$refs.form.validate()) {
        this.form.guestId = this.user._id
        this.form.trigger = "Contact Form"
        userApi.bookUser(this.form, async response => {
          this.$refs.form.reset()
          this.formSended = true
        })
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
}
</style>