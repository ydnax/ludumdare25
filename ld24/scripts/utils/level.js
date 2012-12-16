re.c('level')
.defines({
  trash: [],
  build:function(){
    if(re.hitmap){
      re.hitmap.dispose();
    }
    re.hitmap = re.e('hitmap');
    this.placeTiles();
  },
  
  teardown:function(){
    this.trash.forEach(function(obj){
      obj.dispose();
    })
  },
  
  placeTiles:function(){
    var map = this.layer.data.$;
    for(var y=0; y<map.length; y++){
      for(var x=0; x<map[0].length; x++){
        var v = map[y][x];
        if(v){
          if(v!=-1){
            re.hitmap.automap(x, y, 1);
            v--;
            var tile = re.e('tile').attr({
              tileX:x,
              tileY:y,
              frame:v
            });
            this.trash.push(tile);
          }else{
            var obj = re.e('spike')
                      .attr({
                        frame: 2, 
                        posX:35*x,
                        posY:35*y - re.tile.sizeY //tiled editor adds an extra tile to y
                      });
            this.trash.push(obj);
          }
        }
        
      }
      
    }
    this.trash.push(re.hitmap);
  },
})
;