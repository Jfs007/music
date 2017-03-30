const state =  {
		audio: {
			id: 0,
			name: '歌曲名称',
			singer: '演唱者',
			albumPic: '',
			albumPicSmall: '/static/player-bar.png',
			location: '',
			album: ''
		},
		index: 0,
		playing: false,
		change: false,
		playList: [],
		currentTime: 0,
		skipTime: 0,
		durationTime: 0.1,
		bufferTime: 0,
		showDetail: true,
		loading: true,
		playType: '列表循环',
		history:['周传雄','薛之谦','hw']
	}
export default state;
