re.scene('load')
.enter(function(){
  re.tile.sizeX = re.tile.sizeY = 32;
  re.sys.clearColor = '#D6F8FA';
  re.force.graY = 30 * re.sys.stepSize;
  re.preventDefault('left right up down space');
  this.loading=re.e('text align')
  .text('loading assets…')
  .alignHor()
  .alignVer()
  re.load(re.assets)
  .complete(function(){
    // loading.dispose();
    re.scene('home').enter();
    // re.scene(re.scene.home);
  });
  
})
.exit(function(){
    this.loading.dispose();
});