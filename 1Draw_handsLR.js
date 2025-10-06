// ----=  HANDS  =----
// USING THE GESTURE DETECTORS (check their values in the debug menu)
// detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

let bgImage;
let glowImage;

/* load images here */
function prepareInteraction() {
  bgImage = loadImage('/images/ShadowBG.png');
  glowImage = loadImage('/images/Glow png.png')

}

function drawInteraction(faces, hands) {
  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
 
   image(bgImage, 0, 0);
  
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // console.log(hand);
    if (showKeypoints) {
      drawConnections(hand)
    }

    
    /*
    Start drawing on the hands here
    */


   let thumbMcpX = hand.thumb_mcp.x;
   let thumbMcpY = hand.thumb_mcp.y;

   let pinkyFingerMcpX = hand.pinky_finger_mcp.x;
   let pinkyFingerMcpY = hand.pinky_finger_mcp.y;

   let handDist = dist(thumbMcpX, thumbMcpY,pinkyFingerMcpX, pinkyFingerMcpY);
   console.log(handDist) //570 and 80

   let GattSize = map(handDist, 570, 80, 750,100);

   let middleFingerMcpX = hand.middle_finger_mcp.x;
   let middleFingerMcpY = hand.middle_finger_mcp.y;

   let pinkyFingerTipX = hand.pinky_finger_tip.x;
   let pinkyFingerTipY = hand.pinky_finger_tip.y;

    let whatGesture = detectHandGesture(hand)

    if (whatGesture == "Open Palm") {

     image(glowImage,pinkyFingerTipX, pinkyFingerTipY, GattSize, GattSize);
     DrawGatt(middleFingerMcpX, middleFingerMcpY, GattSize, GattSize);

    }

    function DrawGatt(middleFingerMcpX, middleFingerMcpY, GattSize){

  let leftearX = middleFingerMcpX-20; //+30
  let leftearY = middleFingerMcpY-20; //+20

  let rightearX = middleFingerMcpX + 15; //+65
  let rightearY = middleFingerMcpY + 45; //+85

  strokeWeight(3);
  stroke(0);
  fill(255);

   // Start drawing the shape.
 beginShape();

  // Add vertices.

  //left ear
  vertex(leftearX, leftearY);//tip of left ear
  vertex(leftearX +20, leftearY+20); //left head

  //right ear
  vertex(rightearX, rightearY - 45); //right head
  vertex(rightearX+20, rightearY-65);//tip of right ear

  //right hand 
  vertex(rightearX+20, rightearY-35); //armpit
  vertex(rightearX+32, rightearY-20); // hand
  vertex(rightearX+20,rightearY-25); //shoulder

  //right foot
  vertex(rightearX+20, rightearY+15); //right foot
  vertex(rightearX,rightearY); //right crotch

  //left foot
  vertex(leftearX +20 ,leftearY+65); // crotch
  vertex(leftearX, leftearY+80); // foot

  //tail
  vertex(leftearX, leftearY+70);
  vertex(leftearX -10, leftearY+70);
  vertex(leftearX, leftearY+65)

  //left hand
  vertex(leftearX, leftearY+30); //arm pit
  vertex(leftearX-13,leftearY+45); // hand
  vertex(leftearX, leftearY+40); //shoulder

  // Stop drawing the shape.
endShape(CLOSE);

//eyes
  stroke(0)
  strokeWeight(1);
  fill(255);
  ellipse(leftearX +15, leftearY +30, 3, 3); //left eye
  ellipse(rightearX+5, rightearY -35, 3,3); //right eye

//nose
  stroke(0.5)
  strokeWeight(1);
  fill(0);
  ellipse(leftearX +27, leftearY +30, 3, 3); 

//mouth
 strokeWeight(1);
 stroke(0);
 line(leftearX+20, leftearY +33, rightearX, rightearY-32);
  } 

    /*
    Stop drawing on the hands here
    */
  }
  // You can make addtional elements here, but keep the hand drawing inside the for loop.
  //------------------------------------------------------

}


function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}

// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 10);
  }
  pop()

}