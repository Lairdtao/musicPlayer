 //获取音乐列表
            getMusic(function(list) {
                musicList = list
                setPlaylist(list)
                loadMusic(list[musicIndex])
            })

 //给图标添加点击事件,点击时替换播放和暂停键
            playBtn.onclick = function() {
                var icon = this.querySelector('.fa')
                if (icon.classList.contains('fa-play')) {
                    music.play()
                } else {
                    music.pause()
                }
                icon.classList.toggle('fa-play')
                icon.classList.toggle('fa-pause')
            }


             //设置时间间隔,为一秒刷新一次,暂停时去除
            music.onplaying = function() {
                timer = setInterval(function() {
                    updateProgress()
                }, 1000)
                console.log('play')
            }
            music.onpause = function() {
                console.log('pause')
                clearInterval(timer)
            }


 //设置进度条,总时间等于其总长度
            progressBarNode.onclick = function(e) {
                var percent = e.offsetX / parseInt(getComputedStyle(this).width)
                music.currentTime = percent * music.duration
                progressNowNode.style.width = percent * 100 + "%"
            }


            
            //为列表添加点击事件,点击列表时播放对应的音乐
            musicListContainer.onclick = function(e) {
                if (e.target.tagName.toLowerCase() === 'li') {
                    for (var i = 0; i < this.children.length; i++) {
                        if (this.children[i] === e.target) {
                            musicIndex = i
                        }
                    }
                    console.log(musicIndex)
                    loadMusic(musicList[musicIndex])
                }
            }





 //监听点击事件,获取点击次数%音乐列表长度数位的数据
            function loadNextMusic() {
                musicIndex++
                musicIndex = musicIndex % musicList.length
                loadMusic(musicList[musicIndex])
            }

            function loadLastMusic() {
                musicIndex--
                musicIndex = (musicIndex + musicList.length) % musicList.length
                loadMusic(musicList[musicIndex])
            }


             //获取播放器进度条长度,使其等于播放进行的时间处以总时间的百分比,将播放时长转化为分钟,判断秒数是否为两位数,是则不变,不是则在前面加上0
            function updateProgress() {
                var percent = (music.currentTime / music.duration) * 100 + '%'
                progressNowNode.style.width = percent

                var minutes = parseInt(music.currentTime / 60)
                var seconds = parseInt(music.currentTime % 60) + ''
                seconds = seconds.length == 2 ? seconds : '0' + seconds
                timeNode.innerText = minutes + ':' + seconds
            }

            //Ajax请求数据
            function getMusic(callback) {
                var xhr = new XMLHttpRequest()
                xhr.open('get', 'music.json', true)
                xhr.send()
                xhr.onload = function() {
                    if ((xhr.status >= 200 && xhr.status < 400)) {
                        callback(JSON.parse(xhr.responseText))
                    }
                }
            }