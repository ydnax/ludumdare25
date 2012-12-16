re.c('spike')
.requires('tiles.png tsprite update force body')
.defines({
  
  speed:40 * re.sys.stepSize,
  
  friX:0.75,
  friY:0.95,
  
  padX:6,
  
  bodyX:32,
  bodyY:32,
  
});