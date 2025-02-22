<template>
    <!-- {{ formattedAmount }} -->
        <UInput
        :maxlength="12"
        v-model="formattedAmount"
        @keyup="formatAmount"
        @blur="onBlur"
        @focus="onFocus"
        type="text"
        >
            <template #trailing>
                <span class="text-gray-500 dark:text-gray-400 text-xs">NGN</span>
            </template>
        </UInput>
     <!--  <input class=" outline-none text-black bg-transparent border p-2 rounded-md"
        v-model="formattedAmount"
        @input="formatAmount"
        @blur="onBlur"
        @focus="onFocus"
        type="text"
        placeholder="Enter amount"
      /> -->
    
  </template>
  
  <script>
  export default {
    name: 'AmountInput',
    props: {
      modelValue: {
        type: [String, Number],
        required: true
      },
      placeholder: {
        type: String,
        default: 'Enter amount'
      }
    },
    data() {
      return {
        amount: this.modelValue ? this.modelValue.toString().replace(/[^\d]/g, '') : '',
        formattedAmount: this.numberWithCommas(this.modelValue)
      };
    },
    methods: {
      formatAmount() {
        let value = this.formattedAmount.replace(/[^\d]/g, '');
        this.formattedAmount = this.numberWithCommas(value);
        this.amount = value;
        this.$emit('update:modelValue', this.amount);
      },
      numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
      onBlur() {
        if (this.amount) {
          this.formattedAmount = this.numberWithCommas(this.amount);
        }
      },
      onFocus() {
        this.formattedAmount = this.amount;
      }
    },
    watch: {
      modelValue(newVal) {
        this.amount = newVal ? newVal.toString().replace(/[^\d]/g, '') : '';
        this.formattedAmount = this.numberWithCommas(this.amount);
      }
    }
  };
  </script>
  
  
  <style scoped>

  </style>
  