re.c('level')
.defines({
  trash: [], // gc for teardown/dispose
  interactives: [],
  interacives_i: 0,
  interactives_last: undefined,
  selectNext:function(){
    if(!this.interactives_last.dead)
      this.interactives_last.deselect()
    this.interactives=this.interactives.filter(function(obj){return !obj.dead});
    if(this.interactives.length==0)
      return
    this.interacives_i = (this.interacives_i+1)%this.interactives.length;
    (this.interactives_last=this.interactives[this.interacives_i]).select();
    // console.log(this.interactives_last);
  },
  build:function(){
    if(re.hitmap){
      re.hitmap.dispose();
    }
    re.hitmap = re.e('hitmap');
    this.ProcessLayers();
  },
  ProcessLayers:function(){
    var layers = Array.isArray(this.layer)?this.layer:[this.layer];
    for(i in layers){
      var layer=layers[i];
      var map = layer.data.$;
      var opts = this.getOpts(layer.properties );
      // console.log(opts)
      for(var y=0; y<map.length; y++){
        for(var x=0; x<map[0].length; x++){
          var v = map[y][x];
          if(v){
            if(opts.collide){
              // console.log("collide");
              re.hitmap.automap(x, y, 1)
            }
            v--;
            if(opts.interactive){
              var obj = re.e('spike')
                        .attr({
                          frame: v, 
                          posX:re.tile.sizeX*x,
                          posY:re.tile.sizeY*y //tiled editor adds an extra tile to y
                        });
                        // console.log(obj.bodyX)
                        // obj.fall();
                        // console.log(obj)
              this.interactives.push(obj);
              this.trash.push(obj);
            }else{
              var tile = re.e('tile').attr({
                tileX:x,
                tileY:y,
                frame:v
              });
              // console.log(tile)
              this.trash.push(tile);
            }
          }
          
        }
        
      }
    }
    (this.interactives_last=this.interactives[0]).select();
    this.interacives_i=0;
    this.trash.push(re.hitmap);
  },
  teardown:function(){
    this.trash.forEach(function(obj){
      obj.dispose();
    })
  },
  getOpts: function(props){
    if(!props){
      return {collide:false, interactive:false};
    }
    props = props.property;
    var ret = {collide:false, interactive:false};
    if(!Array.isArray(props)){
      switch(props.name){
        case 'collide':
          ret.collide=props.value==1;
        break;
        case 'interactive':
          ret.interactive=props.value==1;
        break
      }
    }else{
      for(i in props){
        var pair=props[i];
        switch(pair.name){
          case 'collide':
            ret.collide=pair.value==1;
          break;
          case 'interactive':
            ret.interactive=pair.value==1;
          break
        }
      }
    }
    return ret;
  },
})
;