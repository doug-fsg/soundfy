<template>
  
  <div class="container mt-2">

    



    <b-form>
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

      <b-form-group label="Status" label-for="status">
        <b-form-select
          id="status"
          v-model="form.status"
          :options="optionsStatus"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Data do ensaio" label-for="dateOverdue">
        <b-form-datepicker
          id="dateOverdue"
          v-model="form.dateOverdue"
          label-no-date-selected="Selecione uma data"
          :min="getToday()"
        ></b-form-datepicker>
      </b-form-group>

      <b-button type="submit" variant="outline-primary" @click="saveTask">
        <i class="fas fa-save"></i> Salvar
      </b-button>
    </b-form>
  </div>
</template>

<script>
import ToastMixin from "@/mixins/toastMixin.js";
import { required, minLength } from "vuelidate/lib/validators";
import TasksModel from "@/models/TasksModel";
import LabelModel from "@/models/LabelModel";
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
      methodSave: "new",
      optionsStatus: [
        // { value: Status.OPEN, text: "Aberto" },
        // { value: Status.FINISHED, text: "Finalizado" },
        // { value: Status.ARCHIVED, text: "Arquivado" },
      ],
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

  async created() {
    
    if (this.$route.params.taskId) {
      this.methodSave = "update";
      this.form = await TasksModel.find(this.$route.params.taskId);
    }
    
    await this.loadLabelOptions();
    console.log("LABEL2", await this.getLabel());
  },

  methods: {
    async getLabel() {
      this.isLoading = true;
      let self = this;
      setTimeout(function () {
        self.isLoading = false;
      }, 3000);
      return await LabelModel.params({
        userId: JSON.parse(localStorage.getItem("authUser")).id,
        status: this.statusList,
      }).get();
    },

            // Adiciona os labels à optionsList
            async loadLabelOptions() {
    const labels = await this.getLabel();
    this.optionsStatus.push(...labels.map(label => ({ value: label.id, text: label.name })));
},


    saveTask() {
      this.$v.$touch();
      if (this.$v.$error) return;

      if (this.methodSave === "update") {
        this.form.save();

        this.showToast("success", "Sucesso!", "Tarefa atualizada com suceso");
        this.$router.push({ name: "list" });
        return;
      }

      const task = new TasksModel(this.form);
      task.save();

      this.showToast("success", "Sucesso!", "Tarefa criada com suceso");
      this.$router.push({ name: "list" });
    },

    getToday() {
      return new Date().toISOString().split("T")[0];
    },
  },

  computed: {
    getValidation() {
      if (this.$v.form.subject.$dirty === false) {
        return null;
      }

      return !this.$v.form.subject.$error;
    },
  },
};
</script>
