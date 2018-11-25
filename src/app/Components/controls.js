export const controlsMusic = () => {

    const musicGame = new Audio('./src/music/music.mp3');
    musicGame.play()
    musicGame.loop = true
  
    // Click Play/Pause
    document.querySelector('.controls__music--play').addEventListener('click', function(e) {
      if(document.body.classList.contains('start')) {
        document.body.classList.remove('start')
        musicGame.pause()
      } else {
        document.body.classList.add('start')
        musicGame.play()
      }
    })
  
    // Click Mute
    document.querySelector('.controls__music--mute').addEventListener('click', function(e) {
      console.log(document.body.classList.contains('not-mute'))
      if(document.body.classList.contains('not-mute')) {
        document.body.classList.remove('not-mute')
        musicGame.muted = false;
      } else {
        document.body.classList.add('not-mute')
        musicGame.muted = true;
      }
    })
  }
