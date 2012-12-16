re.c('hero')
.requires('hero.png tsprite update force animate body')
.defines({
  
  speed:40 * re.sys.stepSize,
  
  friX:0.75,
  friY:0.95,
  
  jumpSpeed:480 * re.sys.stepSize,
  jump:false,
  ground:true,
  walkdir: 0, // -1,0,1 l s r
  
  update:function(){
    
    //jump
    // if(this.ground && !this.jump && re.pressed('w')){
    //   this.forceJump();
    // }
    
    //walk back and fourth
    if(this.walkdir==-1){
    // if((this.walkdir==-1)||re.pressed('a')){
      this.velX -= this.speed;
      this.scaleX = -1;
      
      if(!this.jump) this.animate('run');
    }

  if(re.pressed('p')){
      //put debugcode here ;)
    }
    
    if(this.walkdir==1){
    // if((this.walkdir==1)||re.pressed('d')){
      this.velX += this.speed;
      this.scaleX = 1;
      
      if(!this.jump) this.animate('run');
    }
    
    //switch back to idle animation if stopped moving
    if(this.isIdle(0.3)) this.animate('idle');
    
  },
  
  forceJump:function(){
    this.jump = true;
    this.velY -= this.jumpSpeed;
    
    this.animate('jump');
  },
  
  jumpReset:function(x, y, tx, ty){
    //check if a hit happened on the y axis
    if(x){
      this.walkdir*=-1;
      // console.log(arguments)
      // console.log("x!");
    }
    if(y){
      //console.log("y!")
      this.jump = false;
      this.ground = (ty >= this.posY);
    }
  },
  gotHit:function(){
    for(var i=0;i<15;i++){
      re.e('particle').attr({
        posX:this.posX,
        posY:this.posY,
        color: '#ff1010',
        sizeX: 4,
        sizeY: 4,
      });
    }
    this.walkdir=0;
  },
  
})
.init(function(){
  this.bodyX = re.tile.sizeX;
  this.bodyY = re.tile.sizeY*2;
  this.sizeY = re.tile.sizeY*2;
  //add animations
  this.animates = {
    idle:[800, [0], -1],
    run:[300, [0,1,2,3], 1],
    jump:[500, [0], 1],
    ladder:[500, [0], -1]
  };
  // this.animates = {
  //   idle:[800, [0, 1], -1],
  //   run:[800, [2, 3], 1],
  //   jump:[500, [4, 5, 4], 1],
  //   ladder:[500, [6, 7], -1]
  // };
  
  this.on({
    update:this.update,
    aftermath:this.jumpReset
  });
  

  this.walkdir=1;
});