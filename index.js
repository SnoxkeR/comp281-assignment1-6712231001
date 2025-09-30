
import { getContext, FPS } from "./utils-module.js";

// กำหนดชื่อเรื่องของเอกสาร HTML
document.title = "A01 - App Graphics 2D";
// กำหนดให้ฟังก์ชัน main ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
document.addEventListener("DOMContentLoaded", main);

// ฟังก์ชันหลักที่ใช้ในการเริ่มต้นแอปพลิเคชัน ทำงานเมื่อ DOM ถูกโหลดเสร็จสมบูรณ์
function main(ev) {
	// เข้าถึง context ของ canvas ที่มี id เป็น "myCanvas"
	const ctx = getContext("#myCanvas");
	// วาดท้องฟ้าด้วย Canvas 2D
	if (!ctx.canvas) {
		// สร้าง canvas ถ้ายังไม่มีใน HTML
		const newCanvas = document.createElement('canvas');
		newCanvas.id = 'myCanvas';
		newCanvas.width = 800;
		newCanvas.height = 500;
		document.body.appendChild(newCanvas);
	}
	const c = ctx.canvas;
	const skyCtx = c.getContext('2d');
	// วาดพื้นหลังท้องฟ้า
	skyCtx.fillStyle = '#87ceeb'; // สีฟ้าอ่อน
	skyCtx.fillRect(0, 0, c.width, c.height);

	// วาดเมฆ
	function drawCloud(x, y, scale) {
		skyCtx.save();
		skyCtx.translate(x, y);
		skyCtx.scale(scale, scale);
		skyCtx.beginPath();
		skyCtx.arc(0, 0, 30, Math.PI * 0.5, Math.PI * 1.5);
		skyCtx.arc(40, -20, 40, Math.PI * 1, Math.PI * 1.85);
		skyCtx.arc(80, 0, 30, Math.PI * 1.37, Math.PI * 0.37, true);
		skyCtx.closePath();
		skyCtx.fillStyle = 'white';
		skyCtx.globalAlpha = 0.85;
		skyCtx.fill();
		skyCtx.globalAlpha = 1.0;
		skyCtx.restore();
	}

	drawCloud(150, 100, 1.2);
	drawCloud(400, 80, 1);
	drawCloud(600, 130, 0.8);

	// กำหนดค่าเริ่มต้นสำหรับแอปพลิเคชันในรูปแบบของอ็อบเจกต์ config
	const config = {
		width : 800,
		height : 600,
		bgColor : "white",
		debug : true,
	};

	// กำหนดขนาดของ canvas ตามค่า config
	ctx.canvas.width = config.width;
	ctx.canvas.height = config.height;

	function draw() {
		// ใช้ FPS สำหรับการวัดอัตราเฟรมต่อวินาที
		FPS.update();

		// กำหนดสีพื้นหลังของ canvas และใช้ fillRect เพื่อเติมสีพื้นหลัง
		ctx.fillStyle = config.bgColor;
		ctx.fillRect(0, 0, config.width, config.height);


		// 1) ท้องฟ้า
		let skyGradient = ctx.createLinearGradient(0, 0, 0, 300);
		skyGradient.addColorStop(0, '#87ceeb');
		skyGradient.addColorStop(1, '#e0f7fa');
		ctx.fillStyle = skyGradient;
		ctx.fillRect(0, 0, config.width, 300);


		// 2) ภูเขา 2 ลูก
		function drawHalfCircleMountain(cx, cy, r, color) {
			ctx.save();
			ctx.beginPath();
			ctx.arc(cx, cy, r, Math.PI, 0, false);
			ctx.lineTo(cx + r, cy + r * 0.35);
			ctx.lineTo(cx - r, cy + r * 0.35);
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.restore();
		}
	// ภูเขาซ้ายสุด (โค้งสูง)
	drawHalfCircleMountain(90, 320, 210, '#4e5d2e');
	// ภูเขาซ้าย
	drawHalfCircleMountain(260, 340, 140, '#6c9f15ff');
	// ภูเขาขวา
	drawHalfCircleMountain(540, 350, 170, '#6B8E23');
	// ภูเขาขวาสุด (โค้งสูง)
	drawHalfCircleMountain(720, 300, 170, '#4d6e05ff');

	// 3) พระอาทิตย์
	let sunCenterX = (260 + 540) / 2;
	let sunCenterY = 150;
	let sunRadius = 60;
	let sunGradient = ctx.createRadialGradient(sunCenterX, sunCenterY, 20, sunCenterX, sunCenterY, sunRadius);
	sunGradient.addColorStop(0, '#f09d7fff');
	sunGradient.addColorStop(1, '#c27114ff');
	ctx.save();
	ctx.beginPath();
	ctx.arc(sunCenterX, sunCenterY, sunRadius, 0, 2 * Math.PI);
	ctx.fillStyle = sunGradient;
	ctx.globalAlpha = 0.92;
	ctx.fill();
	ctx.globalAlpha = 1.0;
	ctx.restore();


	// 4) ท้องนา
	let fieldGradient = ctx.createLinearGradient(0, 300, 0, config.height);
	fieldGradient.addColorStop(0, '#b4e197');
	fieldGradient.addColorStop(1, '#7ec850');
	ctx.fillStyle = fieldGradient;
	ctx.fillRect(0, 300, config.width, config.height - 300);

		// 5) ต้นไม้
		function drawTree(x, y, scale=1) {
			ctx.save();
			ctx.translate(x, y);
			ctx.scale(scale, scale);
			// trunk
			ctx.fillStyle = '#8d5524';
			ctx.fillRect(-7, 0, 14, 40);
			// leaves
			ctx.beginPath();
			ctx.arc(0, 0, 22, Math.PI*0.7, Math.PI*2.3);
			ctx.arc(-15, 10, 16, Math.PI*0.7, Math.PI*2.3);
			ctx.arc(15, 10, 16, Math.PI*0.7, Math.PI*2.3);
			ctx.closePath();
			ctx.fillStyle = '#388e3c';
			ctx.fill();
			ctx.restore();
		}
	drawTree(120, 340, 1.65);
	drawTree(200, 370, 1.15);
	drawTree(700, 370, 1.8);

		// 6) บ้าน
		function drawHouse(x, y, scale=1) {
			ctx.save();
			ctx.translate(x, y);
			ctx.scale(scale, scale);
			// ตัวบ้าน
			ctx.fillStyle = '#b39665ff';
			ctx.fillRect(0, 0, 60, 40);
			// หลังคา
			ctx.beginPath();
			ctx.moveTo(-10, 0);
			ctx.lineTo(30, -25);
			ctx.lineTo(70, 0);
			ctx.closePath();
			ctx.fillStyle = '#e05c5cff';
			ctx.fill();
			// ประตู
			ctx.fillStyle = '#532d0cff';
			ctx.fillRect(25, 20, 12, 20);
			ctx.restore();
		}
	drawHouse(500, 370, 1.5);

		// 7) แม่น้ำ
		ctx.save();
		ctx.beginPath();
		let riverGradient = ctx.createLinearGradient(config.width/2, 300, config.width/2, config.height);
		riverGradient.addColorStop(0, '#4fc3f7');
		riverGradient.addColorStop(1, '#1976d2');
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(config.width/2 - 38, 300);
		ctx.bezierCurveTo(
			config.width/2 - 80, 340,
			config.width/2 + 60, 360,
			config.width/2 - 40, 400
		);
		ctx.bezierCurveTo(
			config.width/2 - 100, 440,
			config.width/2 + 100, 460,
			config.width/2 - 20, 500
		);
		ctx.bezierCurveTo(
			config.width/2 + 60, 540,
			config.width/2 - 60, 560,
			config.width/2 + 25, config.height
		);
		ctx.lineTo(config.width/2 + 85, config.height);
		ctx.bezierCurveTo(
			config.width/2 + 170, 560,
			config.width/2, 540,
			config.width/2 + 60, 500
		);
		ctx.bezierCurveTo(
			config.width/2 + 120, 460,
			config.width/2 - 80, 440,
			config.width/2 + 40, 400
		);
		ctx.bezierCurveTo(
			config.width/2 + 80, 360,
			config.width/2 - 60, 340,
			config.width/2 + 38, 300
		);
		ctx.closePath();
		ctx.fillStyle = riverGradient;
		ctx.globalAlpha = 0.85;
		ctx.fill();
		ctx.globalAlpha = 1.0;
		ctx.restore();

		// เขตสิ้นสุดของการวาดรูป


		// แสดงข้อความ FPS บน canvas ถ้า config.debug เป็น true
		if (config.debug) FPS.show(ctx, 10, 28);

		// ใช้ requestAnimationFrame เพื่อเรียกใช้ฟังก์ชัน draw ต่อไป
		requestAnimationFrame(draw);
	}
	// เริ่มต้นการวาดภาพบน canvas
	draw();
}