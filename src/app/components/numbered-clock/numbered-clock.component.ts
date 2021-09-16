import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import moment from 'moment-timezone';

@Component({
  selector: 'app-numbered-clock',
  templateUrl: './numbered-clock.component.html',
  styleUrls: ['./numbered-clock.component.css']
})
export class NumberedClockComponent implements  OnInit, AfterViewInit {

  @Input() timezone;
  @Input() city;
  @Input() displayName: boolean;
  @Input() displayDate: boolean;
  public interval;
  public canvas: any;
  public ctx: any;
  public date;
  constructor() { }

  ngOnInit() {
    if (!this.timezone) {
      this.timezone = moment.tz.guess();
    }
    if (!this.city) {
      this.city = 'local';
  }
  }

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('numberedClockCanvas-' + this.timezone + '-' + this.city);
    this.ctx = this.canvas.getContext('2d');
    let radius = this.canvas.height / 2;
    this.ctx.translate(radius, radius);
    radius = radius * 0.90;
    this.interval = setInterval(() => {
      this.date = moment().tz(this.timezone);
      this.drawClock(this.ctx, radius, this.date);
    }, 1000);
  }

  drawClock(ctx, radius, date) {
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius, date);
    if (this.displayName || this.displayDate) {
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.translate(0, 0);
      if (this.displayDate) {
        ctx.fillText(date.format('Do-MMM-YYYY'), 0, (0.45 * -radius));
      }
      if (this.displayName) {
        ctx.fillText(this.city, 0, (0.45 * radius));
      }
      ctx.translate(0, 0);
    }
  }

  drawFace(ctx, radius) {
    let grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }

  drawNumbers(ctx, radius) {
    let ang;
    let num;
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  drawTime(ctx, radius, date) {
    let hour = date.hours();
    let minute = date.minutes();
    let second = date.seconds();
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
    (minute * Math.PI / (6 * 60)) +
    (second * Math.PI / (360 * 60));
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    // minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

  drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
