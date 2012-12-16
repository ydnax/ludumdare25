re.c('spike')
.requires('tiles.png tsprite dead')
.defines({
  
  speed:40 * re.sys.stepSize,
  // gravX:0,
  friX:0.75,
  friY:0.95,
  disp_called:false,
  _hit:function(x,y){
    if(y){
    // this.alpha=0.1
        var that=this;
        if(!this.disp_called){
            this.disp_called=true;
            setTimeout(function(){that.dispose()}, 500);
        }
    }
  },
  // padX:6,
  fall: function(){
    this.comp("force body")
  },
  select:function(){
    this.alpha=1;
  },
  deselect:function(){
    this.alpha=0.3;
  },

  
})
.init(function(){
  this.bodyX=re.tile.sizeX;
  this.bodyY=re.tile.sizeY;
  this.alpha=0.3;
  this.on({
    aftermath:this._hit
  });
});