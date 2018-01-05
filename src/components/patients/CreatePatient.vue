<template>
  <div class="form-wizard-page">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget class="no-h-padding" :headerText="$t('patients.form.title')">
          <vuestic-wizard
            :steps="hsSteps">
            <div slot="page1" class="form-wizard-tab-content">
              <p>Enter the patients name, email, mobile number and an alternative mobile number</p>
              <!-- Patients Name -->
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('hsName'), 'valid': isFormFieldValid('hsName')}">
                <div class="input-group">
                  <input
                    name="hsName"
                    data-vv-as="Name"
                    v-model="hsName"
                    v-validate="'required'"
                    required title=""/>
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{'patients.form.name' | translate}}</label><i class="bar"></i>
                  <small v-show="errors.has('hsName')" class="help text-danger">{{ errors.first('hsName') }}</small>
                </div>
              </div>
              <!-- Patients email address -->
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('hsEmail'), 'valid': isFormFieldValid('hsEmail')}">
                <div class="input-group">
                  <input
                    name="hsEmail"
                    data-vv-as="Email"
                    v-model="hsEmail"
                    v-validate="'required'"
                    required title=""/>
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{'patients.form.email' | translate}}</label><i class="bar"></i>
                  <small v-show="errors.has('hsEmail')" class="help text-danger">{{ errors.first('hsEmail') }}</small>
                </div>
              </div>
              <!-- Patients Mobile Number -->
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('hsMobile'), 'valid': isFormFieldValid('hsMobile')}">
                <div class="input-group">
                  <input
                    name="hsMobile"
                    data-vv-as="Mobile Number"
                    v-model="hsMobile"
                    v-validate="'required'"
                    required title=""/>
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{'patients.form.mobile' | translate}}</label><i class="bar"></i>
                  <small v-show="errors.has('hsMobile')" class="help text-danger">{{ errors.first('hsMobile') }}</small>
                </div>
              </div>
              <!-- Patients Alternative number -->
              <div class="form-group with-icon-right" :class="{'has-error': errors.has('hsAltMobile'), 'valid': isFormFieldValid('hsAltMobile')}">
                <div class="input-group">
                  <input
                    name="hsAltMobile"
                    data-vv-as="Alternative Number"
                    v-model="hsAltMobile"
                    required title=""/>
                  <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
                  <i class="fa fa-check valid-icon icon-right input-icon"></i>
                  <label class="control-label">{{'patients.form.altMobile' | translate}}</label><i class="bar"></i>
                </div>
              </div>
            </div>
            <div slot="page2" class="form-wizard-tab-content">
              <p>Enter the Patients location details</p>
              <vuestic-simple-select
                label="Select county"
                v-model="hsCounty"
                name="county"
                :required="true"
                ref="hsCountySelect"
                v-bind:options="countriesList">
              </vuestic-simple-select>
              <vuestic-simple-select
                label="Select SubCounty"
                v-model="hsSubCounty"
                name="SubCounty"
                :required="true"
                ref="hsSubCountySelect"
                v-bind:options="countriesList">
              </vuestic-simple-select>
              <vuestic-simple-select
                label="Select ward"
                v-model="hsWard"
                name="Ward"
                :required="true"
                ref="hsWardSelect"
                v-bind:options="countriesList">
              </vuestic-simple-select>
              <vuestic-simple-select
                label="Select village"
                v-model="hsVillage"
                name="village"
                :required="true"
                ref="hsVillageSelect"
                v-bind:options="countriesList">
              </vuestic-simple-select>
            </div>
            <div slot="page3" class="form-wizard-tab-content">
              <h4>{{'patients.form.confirm' | translate}}</h4>
              <p>Name: {{this.hsName}} </p>
              <p>Mobile Number: {{this.hsMobile}} </p>
              <p>Email: {{this.hsEmail}} </p>
              <p>Alternative Number: {{this.hsAltMobile}} </p>
            </div>
            <div slot="wizardCompleted" class="form-wizard-tab-content">
              <h4>{{'forms.wizard.completed' | translate}}</h4>
              <p>
                You have succesfully added a new patient
              </p>
            </div>
          </vuestic-wizard>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import VuesticWizard from '../vuestic-components/vuestic-wizard/VuesticWizard'
  import CountriesList from './CountriesList'
  import VuesticSimpleSelect from '../vuestic-components/vuestic-simple-select/VuesticSimpleSelect'

  export default {
    name: 'form-wizard',
    components: {
      VuesticWizard,
      VuesticSimpleSelect
    },
    computed: {
      hsSteps () {
        return [
          {
            label: this.$t('patients.form.stepOne'),
            slot: 'page1',
            onNext: () => {
              this.validateFormField(['hsName', 'hsEmail', 'hsMobile'])
            },
            isValid: () => {
              if ((this.isFormFieldValid('hsName') === true) && this.isFormFieldValid('hsEmail') === true) {
                return true
              } else {
                return false
              }
            }
          },
          {
            label: this.$t('patients.form.stepTwo'),
            slot: 'page2',
            onNext: () => {
              this.$refs.hsCountySelect.validate()
              this.$refs.hsSubCountySelect.validate()
              this.$refs.hsWardSelect.validate()
              this.$refs.hsVillageSelect.validate()
            },
            isValid: () => {
              this.$store.dispatch('createPatient', {
                name: this.hsName,
                email: this.hsEmail,
                mobile: this.hsMobile,
                altMobile: this.hsAltMobile,
                county: this.hsCounty,
                subCounty: this.hsSubCounty,
                ward: this.hsWard,
                village: this.hsVillage
              })
              return this.$refs.hsCountySelect.isValid()
            }
          },
          {
            label: this.$t('patients.form.stepFour'),
            slot: 'page3'
          }
        ]
      }
    },
    data () {
      return {
        hsName: '',
        hsEmail: '',
        hsMobile: '',
        hsAltMobile: '',
        hsCounty: '',
        hsSubCounty: '',
        hsWard: '',
        hsVillage: '',
        countriesList: CountriesList,
        chosenCounty: '',
        chosenSubCounty: '',
        chosenWard: '',
        chosenVillage: ''
      }
    },
    methods: {
      isFormFieldValid (field) {
        let isValid = false
        if (this.formFields[field]) {
          isValid = this.formFields[field].validated && this.formFields[field].valid
        }
        return isValid
      },
      validateFormField (fieldNames) {
        for (var fieldName in fieldNames) {
          this.$validator.validate(fieldNames[fieldName], this[fieldName])
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../sass/_variables.scss";
  @import "../../../node_modules/bootstrap/scss/variables";
  @import "../../../node_modules/bootstrap/scss/mixins/breakpoints";

  .widget.simple-vertical-wizard-widget {
    .widget-body {
      padding: 0 $widget-padding;
      @include media-breakpoint-down(sm) {
        padding: $widget-padding 0;
      }
    }
  }

  .form-wizard-page {
    .form-group {
      min-width: 200px;
      max-width: 360px;
      width: 80%;
    }
  }
</style>
