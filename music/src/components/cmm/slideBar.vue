<template>
	<mu-drawer :open="open" :docked="docked" @close="toggle()">
		<div class="bottomBar">
			设置
		</div>
	</mu-drawer>
</template>
<script type="text/javascript">
	export default {
		data: function() {
			return {
				docked: false,
				open: false
			}
		},
		methods: {
			toggle(flag) {
				this.open = !this.open
				this.docked = !flag
			}
		}
	}
</script>
<style type="text/css" scoped>
	.bottomBar{
		height: 4.8rem;
		box-sizing: border-box;
		padding: 1.2rem 1rem;
		position: absolute;
		bottom: 0;
		left: 0;
	}
</style>