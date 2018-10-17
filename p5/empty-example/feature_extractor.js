let mobilenet;
let classifier;
let video;
let label ='';

let ukeButton;
let whistleButton;
let trainButton;

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
    classifier.classify(gotResults);

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
classifier.classify(gotResults);
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
  classifier=mobilenet.classification(video,videoReady);

  ukeButton=createButton('ukulele');
  ukeButton.mousePressed(function(){
    classifier.addImage('ukulele');
  });


  whistleButton=createButton('whistle');
  whistleButton.mousePressed(function(){
    classifier.addImage('whistle');
  });

  trainButton=createButton('train');
  whistleButton.mousePressed(function(){
    classifier.train(whileTraining);
  });



}



function draw()
{
  image(video,0,0);
  fill(0);
  textSize(64);
  text(label, 10, height - 100);

}
