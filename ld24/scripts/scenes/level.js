re.scene('level')
.enter(function(map){
  re.screen.pos(-re.tile.sizeX * 0.5, -re.tile.sizeY * 0.5);
  this.map = re("level" + map + '.tmx')[0];
  this.map.build();
  re.e('text align')
  .text("mapnr: "+ map)
  .alignHor()
  .alignVer();
  re.e('keyboard').on('keydown:space', function(key, event){
    // re("keyboard").dispose();
      re.scene('level').enter(map);
      // re.scene('level').enter(map+1);
  });
})
.exit(function(){
    re("text").dispose();
    this.map.teardown();
    re("keyboard").dispose();
});