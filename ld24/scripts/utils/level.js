re.c('level')
.defines({
  trash: [], // gc for teardown/dispose
  interactives: [],
  interactives_i: 0,
  interactives_last: undefined,
  setSelected:function(){
    console.log(this.interactives_i)
    if(!this.interactives_last.dead)
      this.interactives_last.deselect()
    this.interactives=this.interactives
      .filter(function(obj){return (!obj.dead)&&(obj.usable) })
      .sort(function(a,b){
        if(a.posX==b.posX){
          return b.posY-a.posY;//if traps are above each other, use the one below
        }
        return a.posX-b.posX;
      });
    if(this.interactives.length==0){
      // console.log("no more interactives")
      return
    }
    if(this.interactives_i<0){
          // console.log("interactives_i<0")
          this.interactives_i=0;
    }
    if(this.interactives_i>=this.interactives.length){
      // console.log("interactives_i>=size")
      this.interactives_i = this.interactives.length-1
    }
      
    // this.interactives_i = (this.interactives_i+1)%this.interactives.length;
    (this.interactives_last=this.interactives[this.interactives_i]).select();
    // console.log(this.interactives_last);
  },
  build:function(){
    if(re.hitmap){
      re.hitmap.dispose();
    }
    re.hitmap = re.e('hitmap');
    this.ProcessObjectLayers();
    this.ProcessTileLayers();
  },
  ProcessTileLayers:function(){
    // var pos = this.objectgroup.object[0];
    // var hero = re.e("hero")
    //   .attr({
    //     posX:pos.x,
    //     posY:pos.y - re.tile.sizeY //tiled editor adds an extra tile to y
    //   });
    var hero = re("hero")[0];
    this.trash.push(hero);
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
                          posY:re.tile.sizeY*y, //tiled editor adds an extra tile to y
                          hero:hero,
                        });
                        // console.log(obj.bodyX)
                        // obj.fall();
                        // console.log(obj)
              this.interactives.push(obj);
              this.trash.push(obj);
            }else{
              // if(!opts.collide) continue;
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
    this.interactives_i=0;
    this.trash.push(re.hitmap);
    hero.drawLast();
  },
  ProcessObjectLayers:function(){
    var objects=this.objectgroup.object;
    var startid = Math.min.apply(undefined, objects.map(function(o){return o.gid}));
    // var startid = 257;
    var hero;
    for(i in objects){
      var obj = objects[i];
      switch(obj.gid-startid){
        case 0:
        console.log("heroc");
          var hero = re.e("hero")
          .attr({
            posX:obj.x,
            posY:obj.y - re.tile.sizeY //tiled editor adds an extra tile to y
          });
        break;
      }
    }
    this.trash.push(hero);
    for(i in objects){
      var obj = objects[i];
      switch(obj.gid-startid){
        case 1:
        console.log("finish");
        break;
        case 2:
        console.log("left %s %s", obj.x, obj.y)
        this.trash.push(re.e('item').attr({
          hero:hero,
          touch:function(){this.hero.walkdir=-1;console.log("h");this.dispose()},
          posX:obj.x,
          posY:obj.y,
          bodyX:re.tile.sizeX,
          bodyY:re.tile.sizeY,
          frame:1
        }).drawLast());
      }
    }
  },
  teardown:function(){
    this.trash.forEach(function(obj){
      obj.dispose();
    });
    this.trash=[];
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
  }
})
;