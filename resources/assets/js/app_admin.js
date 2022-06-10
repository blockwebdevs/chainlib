require('./bootstrap');
require('alpinejs');

import Vue from 'vue';
Vue.prototype.$lang = document.documentElement.getAttribute('lang');
Vue.prototype.$currency = document.documentElement.getAttribute('currency');
Vue.prototype.$currencyRate = document.documentElement.getAttribute('currency-rate');
Vue.prototype.$mainCurrency = document.documentElement.getAttribute('main-currency');
Vue.prototype.$device = document.documentElement.getAttribute('device');

export const bus = new Vue();
import VeeValidate from 'vee-validate';
import VueNestable from 'vue-nestable';
import vSelect from 'vue-select';

Vue.use(VueNestable)

Vue.prototype.trans = trans;

// Vue.component('v-select', vSelect)

// admin Components - CRM
// CRMAddProductsToSet
Vue.component('crm-payment', require('./components/admin/CRM/CRMPayment.vue').default);
Vue.component('crm-shipping', require('./components/admin/CRM/CRMShipping.vue').default);
Vue.component('order-search', require('./components/admin/CRM/OrderSearch.vue').default);
Vue.component('crm-cart', require('./components/admin/CRM/CRMCart.vue').default);

// admin Components - Collections
Vue.component('collections', require('./components/admin/collections/Collections.vue').default);
Vue.component('sets', require('./components/admin/collections/Sets.vue').default);
Vue.component('products-depth', require('./components/admin/collections/Products.vue').default);

// admin Components - Categories
Vue.component('categories', require('./components/admin/Categories.vue').default);
Vue.component('categories-add-new', require('./components/admin/CategoriesAddNew.vue').default);

// admin Components - Blog Categories
Vue.component('blog-categories', require('./components/admin/blogCategories/Categories.vue').default);
Vue.component('blog-categories-add-new', require('./components/admin/blogCategories/CategoriesAddNew.vue').default);

// admin Components - Autoupload
Vue.component('autoupload', require('./components/admin/Autoupload.vue').default);
Vue.component('top-bar-autoupload', require('./components/admin/AutouploadTopBar.vue').default);
Vue.component('edit-autoupload', require('./components/admin/AutouploadEdit.vue').default);
Vue.component('create-autoupload', require('./components/admin/AutouploadCreate.vue').default);

// admin Components - Parameters
Vue.component('create-parameter', require('./components/admin/ParameterCreate.vue').default);
Vue.component('edit-parameter', require('./components/admin/ParameterEdit.vue').default);

// admin Components - Orders
Vue.component('order-filter', require('./components/admin/OrderFilter.vue').default);
Vue.component('orders', require('./components/admin/Orders.vue').default);
Vue.component('order-admin', require('./components/admin/Order.vue').default);
Vue.component('order-create', require('./components/admin/OrderCreate.vue').default);
Vue.component('order-edit', require('./components/admin/OrderEdit.vue').default);

// admin Components - Returns
Vue.component('return-filter', require('./components/admin/ReturnFilter.vue').default);
Vue.component('returns', require('./components/admin/Returns.vue'));
Vue.component('return-create', require('./components/admin/ReturnCreate.vue').default);
Vue.component('return-edit', require('./components/admin/ReturnEdit.vue').default);
Vue.component('return', require('./components/admin/Return.vue').default);

// admin Components - Translations
Vue.component('top-bar-translations', require('./components/admin/TranslationTopBar.vue').default);
Vue.component('group-translations', require('./components/admin/TranslationGroup.vue').default);
Vue.component('item-translations', require('./components/admin/TranslationItem.vue').default);


Vue.directive('select2', {
    inserted(el) {
        $(el).on('select2:select', () => {
            const event = new Event('change', { bubbles: true, cancelable: true });
            el.dispatchEvent(event);
        });

        $(el).on('select2:unselect', () => {
            const event = new Event('change', {bubbles: true, cancelable: true})
            el.dispatchEvent(event)
        })
    },
});


if (Vue.prototype.$device == 'sm'){
    setTimeout(function(){
        $('.sniper-load').fadeOut();
    }, 1700);
}

const app = new Vue({
    el: '#cover'
});
