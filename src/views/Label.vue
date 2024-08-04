<!-- NewLabel.vue -->
<template>
  <div class="container mt-2">
    <b-form @submit.prevent="saveLabel">
      <b-form-group label="Nome da Etiqueta" label-for="name">
        <b-form-input
          id="name"
          v-model.trim="form.name"
          type="text"
          required
          autocomplete="off"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="outline-primary">Salvar</b-button>
    </b-form>
  </div>
</template>

<script>
import LabelModel from "@/models/LabelModel";
import ToastMixin from "@/mixins/toastMixin.js";
export default {
  name: "NewLabel",
  mixins: [ToastMixin],
  data() {
    return {
      form: {
        name: "",
        userId: JSON.parse(localStorage.getItem("authUser")).id,
      }
    };
  },
  methods: {
    async saveLabel() {


  try {
console.log("teestee")
      console.log("teste", this.form)

      const task = new LabelModel(this.form);
      task.save();
      this.showToast("success", "Sucesso!", "Etiqueta criada com sucesso");
    

    this.$router.push({ name: "list" });
  } catch (error) {
    console.error("Erro ao salvar a etiqueta:", error);
    this.showToast("error", "Erro!", "Ocorreu um erro ao salvar a etiqueta");
  }
}

  }
};
</script>
