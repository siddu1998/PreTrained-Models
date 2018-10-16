const model = tf.sequential();

const configHidden=
{
  units: 4,
  inputShape:[2],
  activation:'sigmoid'
}



const hidden = tf.layers.dense(configHidden);


const configOutput=
{
  units:3,
  activation:'sigmoid'
}



const output = tf.layers.dense(configOutput);

model.add(hidden);
model.add(output);


const sgdOpt=tf.train.sgd(0.1);
const config=
{
  optimizer:sgdOpt,
  loss:'meanSquaredError'
}

model.compile(config);


const xs = tf.tensor2d([[0.23,0.92],
                            [0.23,0.52]]);

const ys=tf.tensor2d([
  [0.1,0.1,0.03],
  [0.4,0.01,0.22],
]);

//you can use this config for fit
// const configFit ={
//   epochs:5
// }

train().then(()=>{console.log('training complete')
let outputs = model.predict(xs);
outputs.print();

});

async function train()
{
  for(let i=0;i<10;i++)
  {
const response = await model.fit(xs,ys);
console.log(response.history.loss[0]);
}
}
