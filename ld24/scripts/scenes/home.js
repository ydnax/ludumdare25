re.scene('home')
.enter(function(){
  //add help text
  re.e('text align')
  .text("right left to select spike\nspace to fire spike\n(wasd for figure ai later)\nspace to start")
  .alignHor()
  .alignVer();
  // re.scene('level').enter(1);
  re.e('keyboard').on('keydown:space', function(key, event){
       re.scene('level').enter(1);
  });
})
.exit(function(){
  re('text').dispose();
  re('keyboard').dispose();
});