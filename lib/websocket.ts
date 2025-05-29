export interface StudentAttentionUpdate {
  studentId: string
  score: number
  level: 'high' | 'medium' | 'low'
  timestamp: number
  dataPointsCount: number
}

export interface WebSocketMessage {
  type: string
  clientId?: string
  message?: string
  studentId?: string
  score?: number
  level?: 'high' | 'medium' | 'low'
  timestamp?: number
  dataPointsCount?: number
  students?: any[]
  [key: string]: any
}

// 类型验证函数
function isValidStudentAttentionUpdate(message: WebSocketMessage): boolean {
  return !!(
    message.studentId &&
    typeof message.score === 'number' &&
    message.level &&
    ['high', 'medium', 'low'].includes(message.level) &&
    typeof message.timestamp === 'number' &&
    typeof message.dataPointsCount === 'number'
  )
}

export class TeacherWebSocketClient {
  private ws: WebSocket | null = null
  private url: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 3000
  private clientId: string | null = null

  // 回调函数
  private onConnectedCallback?: () => void
  private onDisconnectedCallback?: () => void
  private onStudentUpdateCallback?: (update: StudentAttentionUpdate) => void
  private onErrorCallback?: (error: string) => void

  constructor(url: string) {
    this.url = url
  }

  // 设置回调函数
  onConnected(callback: () => void) {
    this.onConnectedCallback = callback
  }

  onDisconnected(callback: () => void) {
    this.onDisconnectedCallback = callback
  }

  onStudentUpdate(callback: (update: StudentAttentionUpdate) => void) {
    this.onStudentUpdateCallback = callback
  }

  onError(callback: (error: string) => void) {
    this.onErrorCallback = callback
  }

  // 连接WebSocket
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url)

        this.ws.onopen = () => {
          console.log('🏫 教师端WebSocket连接成功')
          this.reconnectAttempts = 0

          // 注册为教师端
          this.send({
            type: 'register',
            clientType: 'teacher'
          })

          this.onConnectedCallback?.()
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data)
            this.handleMessage(message)
          } catch (error) {
            console.error('消息解析错误:', error)
          }
        }

        this.ws.onclose = () => {
          console.log('🏫 教师端WebSocket连接关闭')
          this.onDisconnectedCallback?.()
          this.attemptReconnect()
        }

        this.ws.onerror = (error) => {
          console.error('🏫 教师端WebSocket错误:', error)
          this.onErrorCallback?.('WebSocket连接错误')
          reject(error)
        }

      } catch (error) {
        reject(error)
      }
    })
  }

  // 处理接收到的消息
  private handleMessage(message: WebSocketMessage) {
    switch (message.type) {
      case 'connection':
        this.clientId = message.clientId
        console.log('🏫 教师端获得客户端ID:', this.clientId)
        break

      case 'registered':
        console.log('🏫 教师端注册成功:', message.message)
        break

      case 'student_attention_update':
        console.log('📊 教师端收到学生专心度更新:', message)
        // 验证消息格式并安全转换
        if (isValidStudentAttentionUpdate(message)) {
          const update: StudentAttentionUpdate = {
            studentId: message.studentId!,
            score: message.score!,
            level: message.level!,
            timestamp: message.timestamp!,
            dataPointsCount: message.dataPointsCount!
          }
          this.onStudentUpdateCallback?.(update)
        } else {
          console.error('❌ 无效的学生专心度更新消息格式:', message)
        }
        break

      case 'student_list':
        console.log('📋 收到学生列表:', message.students)
        break

      case 'error':
        this.onErrorCallback?.(message.message)
        break

      default:
        console.log('🏫 未知消息类型:', message.type)
    }
  }

  // 发送消息
  private send(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      console.error('🏫 教师端WebSocket未连接')
    }
  }

  // 请求学生列表
  requestStudentList() {
    this.send({
      type: 'get_students'
    })
  }

  // 断开连接
  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  // 检查连接状态
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }

  // 自动重连
  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`🏫 尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`)

      setTimeout(() => {
        this.connect().catch(error => {
          console.error('🏫 重连失败:', error)
        })
      }, this.reconnectDelay)
    } else {
      console.error('🏫 达到最大重连次数，停止重连')
      this.onErrorCallback?.('连接失败，请刷新页面重试')
    }
  }

  // 获取客户端信息
  getClientInfo() {
    return {
      clientId: this.clientId,
      connected: this.isConnected(),
      url: this.url
    }
  }
}
