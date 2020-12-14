export class Application {
  protected _start: boolean = false
  protected _requestId: number = -1
  protected _lastTime!: number
  protected _startTime!: number

  public start() {
    if (!this._start) {
      this._start = true
      this._requestId = -1
      this._lastTime = -1
      this._startTime = -1

      this._requestId = requestAnimationFrame((elapsedMsec: number): void => {
        this.step(elapsedMsec)
      })
    }
  }

  public stop(): void {
    if (this._start ) {
      // cancelAnimationFrame函数用于：
      //取消一个先前通过调用window.requestAnimationFrame()方法添加到计划中的动画帧请求
      cancelAnimationFrame(this._requestId)
      this._requestId = -1     // 将_requestId设置为-1
      // 在start和stop函数中，_lastTime和_startTime都设置为-1
      this._lastTime = -1
      this._startTime = -1
      this._start = false
    }
  }

  // 用于查询当前是否处于动画循环状态
  public isRunning(): boolean {
    return this._start ;
  }

  // 不停地周而复始运动
  protected step (timeStamp: number): void {
    // 第一次调用本函数时，设置start和lastTime为timeStamp
    if (this._startTime === -1) this._startTime = timeStamp
    if(this._lastTime === -1) this._lastTime = timeStamp
    //计算当前时间点与第一次调用step时间点的差，以毫秒为单位
    let elapsedMsec: number = timeStamp - this._startTime
    //计算当前时间点与上一次调用step时间点的差（可以理解为两帧之间的时间差）
    // 注意：intervalSec是以秒为单位，因此要除以1000.0
    let intervalSec: number = (timeStamp - this._lastTime) / 1000.0
    //记录上一次的时间戳
    this._lastTime = timeStamp

    console.log(" elapsedTime = " + elapsedMsec + " intervalSec = " +intervalSec )
    // 先更新
    this.update(elapsedMsec , intervalSec)
    // 后渲染
    this.render()
    // 递归调用，形成周而复始地循环操作
    requestAnimationFrame (( elapsedMsec : number ) : void => {
      this.step(elapsedMsec)
    })
  }

  //虚方法，子类能覆写（override）
  //注意：intervalSec是以秒为单位的，而elapsedMsec是以毫秒为单位
  public update (elapsedMsec : number , intervalSec : number): void {
    //
  }

  //虚方法，子类能覆写（override）
  public render () : void {
    //
  }
}