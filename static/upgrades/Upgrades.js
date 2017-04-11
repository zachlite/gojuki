import IO from "socket.io-client";
import $ from "jquery";

class Upgrades {
	constructor(socket, playerNumber, playerData) {
		this.socket = socket;
		this.playerData = playerData;

		this.upgradesTime = 60 * 1000;
		if (playerNumber == 1) {
			this.initTimer();
		}
		this.initUpgrades(playerData);
	}

	initTimer() {
		var timer = setInterval(() => {
            this.upgradesTime -= 1000;
            if (this.upgradesTime < 0) {
                clearInterval(timer);
                this.socket.emit("UPGRADES_OVER");
            } else {
	            this.socket.emit("UPGRADES_TIME_TICK", this.upgradesTime / 1000);        	
            }
        }, 1000);
	}

	initUpgrades(playerData) {

		var that = this;

		$.ajax({
			url: '/upgrades',
			type: 'GET',
			dataType: 'html',
			data: {data: playerData},
		})
		.done(function(upgradesHTML){
			$("#party").html(upgradesHTML);
		});

		$(document).on("click", ".sell-btn", function() {
			that.didClickSell($(this));
		});

		$(document).on("click", ".buy-btn", function() {
			that.didClickBuy($(this));
		});

		this.socket.on("UPGRADES_TIME_TICKED", (timeRemaining) => {
			$("#time-left").text(timeRemaining);
        });
	}

	didClickSell(sellBtn) {
		var itemInfo = sellBtn.parents(".item").data();
		var amount = this.playerData[itemInfo.type];
		if (amount > 0) {
			this.playerData[itemInfo.type] -= 1;
			this.playerData.food += itemInfo.cost;

			$("#food").text(this.playerData.food);
			sellBtn.siblings(".amount").text(this.playerData[itemInfo.type]);
			this.updateBuySellBtns();
		}
	}

	didClickBuy(buyBtn) {
		var itemInfo = buyBtn.parents(".item").data();
		if (this.playerData.food >= itemInfo.cost) {
			this.playerData[itemInfo.type] += 1;
			this.playerData.food -= itemInfo.cost;

			$("#food").text(this.playerData.food);
			buyBtn.siblings(".amount").text(this.playerData[itemInfo.type]);
			this.updateBuySellBtns();
		}
	}

	updateBuySellBtns() {
		var that = this;
		$.each($(".item"), function() {
			
			var buyBtn = $(this).find(".buy-btn");
			if ($(this).data("cost") > that.playerData.food) {
				buyBtn.addClass('disabled');
			} else {
				buyBtn.removeClass('disabled');
			}

			var sellBtn = $(this).find(".sell-btn");
			if (that.playerData[$(this).data("type")] == 0) {
				sellBtn.addClass('disabled');
			} else {
				sellBtn.removeClass('disabled');
			}

		});
	}


	stop() {
		this.socket.removeAllListeners("UPGRADES_TIME_TICKED");
		$(document).off("click", ".sell-btn");
		$(document).off("click", ".buy-btn");
		$("#upgrades").remove();
	}

	getPlayerData() {
		return this.playerData;
	}
}

export default Upgrades;