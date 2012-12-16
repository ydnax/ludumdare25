re.scene('level')
.enter(function(map){
  var that=this;
  re.screen.pos(-re.tile.sizeX * 0.5, -re.tile.sizeY * 0.5);
  this.map = re("level" + map + '.tmx')[0];
  this.map.build();
  re.e('text align')
  .text("mapnr: "+ map)
  .alignHor()
  .alignVer();
  re.e('keyboard')
  .on('keydown:r', function(key, event){
      re.scene('level').enter(map);
  })
  .on('keydown:space', function(key, event){
      that.map.interactives_last.fall();
      // that.map.interactives_i++;
      that.map.setSelected();
  })
  .on('keydown:right', function(){
      that.map.interactives_i=that.map.interactives_i+1;
      that.map.setSelected();
  })
  .on('keydown:left', function(){
      that.map.interactives_i--;
      that.map.setSelected();
  });
})
.exit(function(){
    re("text").dispose();
    this.map.teardown();
    re("keyboard").dispose();
});