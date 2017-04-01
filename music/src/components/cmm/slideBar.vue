<template>
	<mu-drawer :open="open" :docked="docked" @close="toggle()">

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