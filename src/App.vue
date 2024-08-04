<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" class="navbar-custom" v-if="notIsLoginPage">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/images/ico.png" alt="Logo" class="ico">
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Minha Lista</b-nav-item>
          <b-nav-item to="/track">Produção</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-nav class="ml-auto">
        <b-nav-item
          @click="logout()"
          v-b-tooltip.hover
          title="Sair">
          <i class="fas fa-sign-out-alt"></i>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    notIsLoginPage() {
      return this.$route.name !== "login" && this.$route.name !== "register";
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('authUser');
      this.$router.push({ name: "login" });
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}

.ico {
  width: 40px; /* ajuste o tamanho conforme necessário */
  height: auto;
}

.navbar-custom {
  background-color: rgb(24, 24, 24); /* Define a cor de fundo preta */
}
</style>
