<template>
  <div>
    ciao ciao LOGIN PLS
    <!-- <div>
      {{ Vue3GoogleOauth.isInit  }}
    </div>
    <div>
      <button class="bg-blue-300 rounded-md py-1 px-2" @click="login()">LOGIN</button>
    </div>  -->
    <div>
      <button @click="handleClickGetAuth" class="bg-blue-500" :disabled="!isInit">get auth code</button>
    </div>
    <div>
      <button @click="handleClickSignIn" class="bg-blue-500"  v-if="!isSignIn" :disabled="!isInit">signIn</button>
    </div>
    <div>
      <button @click="handleClickSignOut" class="bg-blue-500"  v-if="isSignIn" :disabled="!isInit">signOout</button> 
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
      isInit: false,
      isSignIn: false
    };
  },
  props: {},
  methods: {
    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn()
        console.log('user', googleUser)
        this.isSignIn = this.$gAuth.isAuthorized
      } catch (error) {
        // On fail do something
        console.error(error);
        return null;
      }
    },

    async handleClickSignOut(){
      try {
        await this.$gAuth.signOut()
        this.isSignIn = this.$gAuth.isAuthorized
      } catch (error) {
        // On fail do something
      }
    }
  },
  mounted(){
    let that = this
    let checkGauthLoad = setInterval(function(){
      that.isInit = that.$gAuth.isInit
      that.isSignIn = that.$gAuth.isAuthorized
      if(that.isInit) clearInterval(checkGauthLoad)
    }, 1000);
  }
};
</script>
