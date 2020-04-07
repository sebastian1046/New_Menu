
const Cat = mongoose.model('Cat', { name: {type: String, required: true}, lastName: String, age:Number });

const kitty = new Cat({  lastName: 'Muñoz', age: '12' });
kitty.save().then(() => console.log('meow'));