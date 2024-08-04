<template>
  <div class="login-container vh-100 d-flex justify-content-center align-items-center">
    <div class="login-form p-5 rounded shadow">
      <div class="text-center mb-4">
        <img src="../assets/images/logo.png" alt="Logo" class="logo">
      </div>
      <h2 class="text-center mb-4">Login</h2>
      <b-form>
        <b-form-group label="E-mail" label-for="email">
          <b-form-input
            id="email"
            type="email"
            placeholder="seuemail@dominio.com"
            autocomplete="off"
            v-model.trim="$v.form.email.$model"
            :state="getValidation('email')"
            class="rounded-input"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-for="password">
          <label class="d-flex justify-content-between">
            Senha
            <small><a href="#">Esqueceu sua senha?</a></small>
          </label>
          <b-form-input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            v-model.trim="$v.form.password.$model"
            :state="getValidation('password')"
            class="rounded-input"
          ></b-form-input>
        </b-form-group>

        <b-button 
          type="button" 
          variant="primary"  
          block
          @click="login"
          class="rounded-button"
          ><i class="fas fa-sign-in-alt"></i> Entrar</b-button>

        <hr>

        <b-button 
          type="button" 
          variant="outline-secondary"  
          block
          @click="goToRegister"
          class="rounded-button"
          ><i class="fas fa-user-plus"></i> Não tenho conta</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import UsersModel from "@/models/UsersModel";
import ToastMixin from "@/mixins/toastMixin.js";

export default {
  mixins: [ToastMixin],

  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },

  validations: {
    form: {
      email: {
        required, 
        email
      },

      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$error) return;

      let user = await UsersModel.params({email: this.form.email}).get();

      if(!user || !user[0] || !user[0].email) {
        this.showToast("danger", "Erro!", "Usuário e/ou senha incorretos");
        this.clearForm();
        return;
      }

      user = user[0];
      if(user.password !== this.form.password) {
        this.showToast("danger", "Erro!", "Usuário e/ou senha incorretos");
        this.clearForm();
        return;
      }

      localStorage.setItem('authUser', JSON.stringify(user));
      this.$router.push({name: "list"});
    },

    clearForm() {
      this.form = {
        email: "",
        password: ""
      }
    },

    getValidation(field) {
      if (this.$v.form.$dirty === false) {
        return null;
      }

      return !this.$v.form[field].$error;
    },

    goToRegister() {
      this.$router.push({ name: "register" });
    }
  },
}
</script>

<style>
body, html {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

.login-container {
  background-color: #f7f9fc;
  padding: 1rem;
}

.login-form {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
}

h2 {
  font-weight: bold;
  color: #333;
}

b-form-input, b-button {
  margin-bottom: 1rem;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.logo {
  width: 220px;
  height: auto;
}

.rounded-input {
  border-radius: 12px;
}

.rounded-button {
  border-radius: 12px;
}
</style>
