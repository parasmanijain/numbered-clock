import { Component, OnInit, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { format, getHours, getMinutes, getSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Component({
  selector: 'app-numbered-clock',
  templateUrl: './numbered-clock.component.html',
  styleUrls: ['./numbered-clock.component.scss'],
  standalone: true,
})
export class NumberedClockComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() timezone: string = '';
  @Input() city: string = '';
  @Input() displayName: boolean = false;
  @Input() displayDate: boolean = false;

  public interval: number = 0;
  public canvas: HTMLCanvasElement | null = null;
  public ctx: CanvasRenderingContext2D | null = null;
  public date: Date | null = null;

  constructor() {}

  ngOnInit(): void {
    if (!this.timezone) {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    if (!this.city) {
      this.city = 'local';
    }
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementById(
      `numberedClockCanvas-${this.timezone}-${this.city}`,
    ) as HTMLCanvasElement;

    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
      if (this.ctx) {
        let radius = this.canvas.height / 2;
        this.ctx.translate(radius, radius);
        radius = radius * 0.9;
        this.interval = window.setInterval(() => {
          // Get current UTC time and convert to the specified timezone
          const now = new Date();
          this.date = toZonedTime(now, this.timezone);
          if (this.ctx && this.date) {
            this.drawClock(this.ctx, radius, this.date);
          }
        }, 1000);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private drawClock(ctx: CanvasRenderingContext2D, radius: number, date: Date): void {
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius, date);
    if (this.displayName || this.displayDate) {
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.translate(0, 0);
      if (this.displayDate) {
        // Format date using date-fns with timezone awareness
        const formattedDate = format(date, 'do-MMM-yyyy');
        ctx.fillText(formattedDate, 0, 0.45 * -radius);
      }
      if (this.displayName) {
        ctx.fillText(this.city, 0, 0.45 * radius);
      }
      ctx.translate(0, 0);
    }
  }

  private drawFace(ctx: CanvasRenderingContext2D, radius: number): void {
    let grad: CanvasGradient;
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

  private drawNumbers(ctx: CanvasRenderingContext2D, radius: number): void {
    let ang: number;
    let num: number;
    ctx.font = `${radius * 0.15}px arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  private drawTime(ctx: CanvasRenderingContext2D, radius: number, date: Date): void {
    let hour: number = getHours(date);
    let minute: number = getMinutes(date);
    let second: number = getSeconds(date);
    hour = hour % 12;
    hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    // minute
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI) / 30;
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
  }

  private drawHand(
    ctx: CanvasRenderingContext2D,
    pos: number,
    length: number,
    width: number,
  ): void {
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
