re.scene('home')
.enter(function(){
  //add help text
  re.e('text align')
  .text("hello world.\npress space to continue")
  .alignHor()
  .alignVer();
  re.scene('level').enter(1);
  // re.e('keyboard').on('keydown:space', function(key, event){
  //     re.scene('level').enter(1);
  // });
})
.exit(function(){
  re('text').dispose();
  re('keyboard').dispose();
});