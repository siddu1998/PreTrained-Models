let mobilenet;
let predictor;
let video;
let label ='';
let slider;
let trainButton;

let addButton;


function modelReady() {
  console.log('Model is ready!!!');
  mobilenet.predict(gotResults);
}



function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    label = results
    let prob = results[0].probability;
    predictor.predict(gotResults);

  }
}




function videoReady()
{
  console.log("Video is ready");
}
// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }



function whileTraining(loss)
{
  if(loss==null)
  {console.log('training complete');
predictor.predict(gotResults);
}
else {
  {
    console.log(loss);
  }
}



}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();

  background(0);
  mobilenet = ml5.featureExtractor('MobileNet',video,modelReady);
  predictor=mobilenet.regression(video,videoReady);

  slider = createSlider(0,1,0.5,0.01);


  addButton=createButton('Add example Image');
  addButton.mousePressed(function(){
    predictor.addImage(slider.value());});

  trainButton=createButton('train');
  whistleButton.mousePressed(function(){
    predictor.train(whileTraining);
  });



}



function draw()
{
  image(video,0,0);
  fill(0);
  textSize(64);
  text(label, 10, height - 100);

}
