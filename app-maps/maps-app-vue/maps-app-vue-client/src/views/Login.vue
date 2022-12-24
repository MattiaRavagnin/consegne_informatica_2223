<template>
  <div>
    ciao ciao LOGIN PLS
    <div>
      {{ Vue3GoogleOauth.isInit  }}
    </div>
    <div>
      <button class="bg-blue-300 rounded-md py-1 px-2" @click="login()">LOGIN</button>
    </div> 
    
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: "LoginPage",
  created() {},
  setup() {
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    return {
      Vue3GoogleOauth
    }
    
  },
  data() {
    return {
      idLogin: false
    };
  },
  props: {},
  methods: {
    async login(){
      const googleUser = await this.$gAuth.signIn()
      console.log('this.$gAuth.signIn')
      if(!googleUser){
        return null
      }
    }
  },
};
</script>
