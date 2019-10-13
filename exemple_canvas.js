class CanvasObjet {
  constructor(){ //Paramètres du canvas
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 3;
    this.draw = false;
    this.mousePosition = { x:0, y:0 };
    this.lastPosition = this.mousePosition;
    this.clearButton = document.getElementById("bt-clear");
    this.canvas.width = 200;
    this.canvas.height = 150;
  }

//Gestion des événements
evenements(){
    //Souris
  this.canvas.addEventListener("mousedown", function(e) {
    this.draw = true;
    this.lastPosition = this.getMposition(e);
  });

  this.canvas.addEventListener("mousemove", function(e) {
    this.mousePosition = this.getMposition(e);
    this.canvasResult();
  });

  this.canvas.addEventListener("mouseup", function(e) {
    this.draw = false;
  });


  // Stop scrolling (touch)
  document.body.addEventListener("touchstart", function(e){
    if (e.target == this.canvas){
      e.preventDefault();
    }
  });

  document.body.addEventListener("touchend", function(e){
    if (e.target == this.canvas){
      e.preventDefault();
    }
  });

  document.body.addEventListener("touchmove", function(e){
    if (e.target == this.canvas){
      e.preventDefault();
    }
  });


    // Touchpad
  this.canvas.addEventListener("touchstart", function(e) {
    mousePosition = this.getTposition(e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  });

  this.canvas.addEventListener("touchmove", function(e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  });

  this.canvas.addEventListener("touchend", function(e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    this.canvas.dispatchEvent(mouseEvent);
  });


  //Effacer
  this.clearButton.addEventListener("click", function(e) {
    this.clearCanvas();
  });
}

// Renvoie les coordonnées de la souris
getMposition(mouseEvent){
  if (this.draw) {
    var oRect = this.canvas.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - oRect.left,
      y: mouseEvent.clientY - oRect.top
    };
  }
}

// Renvoie les coordonnées du pad
getTposition(touchEvent){
  var oRect = this.canvas.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - oRect.left,
    y: touchEvent.touches[0].clientY - oRect.top
  };
}

// Dessin du canvas
canvasResult() {
  if(this.draw){
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
    this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
    this.ctx.stroke();
    this.lastPosition = this.mousePosition;
  }
}

// Vide le dessin du canvas
clearCanvas(){
  this.canvas.width = this.canvas.width;
    this.ctx.lineWidth = 3;
}

}