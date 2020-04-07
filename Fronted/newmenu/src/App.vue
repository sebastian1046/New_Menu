<template lang="pug">
  .app
    h1.theTitle Receta 
      span(v-if="title") de 
      span {{ title }}
    form
      .subTitle Nombre de la receta
      input.along(v-model="title" placeholder="Titulo de la receta")
      select.along(v-model="show")
        option(:value="false") No mostrar
        option(:value="true") Mostrar
      
      div
        .subTitle Ingredientes 
        input.along(v-model.number="actualIngredient.quantity" type="number" placeholder="Cantidad" min="0.1" max="1000")
        select.along(v-model="actualIngredient.measure")
          option(value= "" disabled) Medida
          option(value="Pizca") Pizca
          option(value="Kg") kg
          option(value="cucharada") cucharada
        input.along(v-model="actualIngredient.name" type="text" placeholder="Nombre del ingrediente")
        .button(@click="addIngredient") Agregar

      transition-group(name="fade")
        .ingredient.newInformation(v-for="(ingredient, index) in ingredients" :key="ingredient.name") - {{ ingredient.name }} {{ ingredient.quantity | fraction}} {{ ingredient.measure }}
          span.buttonDelete(@click="deleteIngredient(index)") Eliminar

      .subTitle Instrucciones 
      input.along(@keypress.enter="addStep" v-model="actualStep" :placeholder="`Escribe el paso ${steps.length + 1}`") 
      .button(@click="addStep") Agregar 

      transition-group(name="fade")
        .step.newInformation(v-for="(step, index) in steps" :key="step") {{ index + 1 }}. {{ step }}
          span.buttonDelete(@click="deleteStep(index)") Eliminar      
  
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: '',
      show: false,
      steps: [],
      actualStep: '',
      ingredients: [],
      actualIngredient: {
        name: '',
        quantity: '',
        measure: ''
      }
    }
  },

  methods:{
    addStep(){
      if (this.actualStep) {
        this.steps.push(this.actualStep)
        this.actualStep = ''
      }
    },
    deleteStep(index){
        this.steps.splice(index, 1)
    },
    addIngredient(){
      if (this.addIngredient.name && this.actualIngredient.quantity > 0 && this.actualIngredient.measure) {
        this.ingredients.push(this.actualIngredient)
        this.actualIngredient = {
          name: '',
          quantity: 0,
          measure: '' 
        }
      }
    },
    deleteIngredient(index){
        this.ingredients.splice(index,1)
    }
  },

  filters:{
    fraction(value){
      const integer = Math.floor(value)
      
      let numerator = 1
      let float = value - integer
      let parts = 1/float
      let denomitator = parts

      if (!float) {
        return value
      }

      if (float>0.5) {
        numerator = float * 10
        denomitator = numerator * parts
      }

      if (!integer) {
        return `${parseInt(numerator)} / ${parseInt(denomitator)} `
      }

      return `${integer} y ${parseInt(numerator)} / ${parseInt(denomitator)} `
    }
  }
}
</script>

<style lang="stylus">
  .button
    border-radius 20px
    background-color #5984AF
    margin-left 20px
    display inline-block
    cursor pointer
    padding 5px 15px
    color black
  .button:hover
    background-color #97E755

  .buttonDelete
    border-radius 20px
    background-color #5984AF
    margin-left 20px
    display inline-block
    cursor pointer
    padding 0 15px
    color black
  .buttonDelete:hover
    background-color #F93939

  .fade-enter-active, .fade-leave-active
    transform translateX(0px)
    opacity 1
  
  .fade-enter, .fade-leave-to 
    opacity 0
    transform translateX(10px) 

  .step
    transition all .3s
  
  .theTitle
    text-align center
    color #5984AF
  
  .subTitle
    color #5984AF
    margin 20px
    font-family cursive
    display block

  .along 
    display inline-block
    margin-left 20px

  .newInformation
    margin 10px 20px

</style>
