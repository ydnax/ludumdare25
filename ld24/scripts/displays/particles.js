re.c('particle')
.requires('rect force')
.init(function(){
    this.friX = 0.95;
    this.friY = 0.95;
    this.velX = re.random(-10, 10);
    this.velY = re.random(-15, 5);
    this.color= "#ffffff";
    this.bodX = this.sizeX = re.tile.sizeX * 0.25;
    this.bodY = this.sizeY = re.tile.sizeY * 0.25;
    var that=this;
    setTimeout(function(){that.dispose()}, re.random(500, 1800))
})
.defaults({

});

// re.c('blowup')
// .extend({

//     blowUp:function(tile){

//         var s = 'items.png';

//         if(this.has('hero')) s = 'hero.png';
//         var width = this.bitmap.width / (re.tile.sizeX * 0.5);

//         var x = this.posX + this.regX;
//         var y = this.posY + this.regY;

//         re.e('particle '+s, 4)
//         .each(function(i){

//             this.posX = x;
//             this.posY = y;

//             this.sizeX = re.tile.sizeX * 0.5;
//             this.sizeY = re.tile.sizeY * 0.5;

//             if(i == 0){
//                 this.setFrameId(tile);
//             } 
//             if(i== 1){
//                 this.setFrameId(tile+1);
//             }
//             if(i == 2){
//                 this.setFrameId(tile + width);
//             }
//             if(i == 3){
//                 this.setFrameId(tile + width + 1);
//             }

//         });

//     }

// });