<template>
  <b-modal
    id="modal-scoped"
    ref="modal"
    title="Salvar projeto"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <button id="hertjzjs-export">Export Project </button>
      <b-form-group label="Nome da música" label-for="subject">
        <b-form-input
          id="subject"
          v-model.trim="$v.form.subject.$model"
          type="text"
          required
          autocomplete="off"
          :state="getValidation"
          aria-describedby="subject-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="subject-feedback"
          >Campo obrigatório.</b-form-invalid-feedback
        >
      </b-form-group>
      <b-form-group label="Descrição" label-for="description">
        <b-form-textarea
          id="description"
          v-model="form.description"
          type="text"
          required
          autocomplete="off"
        ></b-form-textarea>
      </b-form-group>
    </form>
    <template #modal-footer="{ ok, cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button type="submit" variant="outline-primary" @click="saveTask">
        <i class="fas fa-save"></i> Salvar
      </b-button>
      <b-button variant="danger" @click="cancel()">
        Cancelar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js";
import { required, minLength } from "vuelidate/lib/validators";
import TasksModel from "@/models/TasksModel";
import Status from "@/valueObjects/status";

export default {
  name: "Form",
  mixins: [ToastMixin],
  data() {
    return {
      form: {
        subject: "",
        description: "",
        status: Status.OPEN,
        dateOverdue: "",
        userId: JSON.parse(localStorage.getItem("authUser")).id,
      },
    };
  },
  validations: {
    form: {
      subject: {
        required,
        minLength: minLength(3),
      },
    },
  },
  created() {
    this.$nextTick(() => {
      this.$refs.modal.show();
    });
  },
  methods: {
    async saveTask() {
      this.$v.$touch();
      if (this.$v.$error) return;
      
      const task = new TasksModel(this.form);
      const response = await task.save();
      console.log("logg", response.id);

      this.showToast("success", "Sucesso!", "Musica salva com suceso");
      this.$router.push({ name: "list" });
    },
    getValidation() {
      if (this.$v.form.subject.$dirty === false) {
        return null;
      }
      return !this.$v.form.subject.$error;
    },
  },
};
</script>
