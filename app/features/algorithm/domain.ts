type Tree<T> = Node<T> | Leaf<T>

type Node<T> = {
  value: T
  children: Tree<T>[]
}

type Leaf<T> = {
  value: T
}

type AlgorithmStep = {
  id: string
  name: string
  // operation: Operation
  executor: Operation | Algorithm
}

type Algorithm = {
  id: string
  name: string
  description: string
  steps: Tree<AlgorithmStep>
}

type OperatorShape = 'unary' | 'binary' | 'ternary'

type PrecedenceGrouping = 'ltr' | 'rtl'
type Precendence = {
  group: PrecedenceGrouping
  rank: number
}
type Operator = {
  id: string
  name: string
  description: string
  shape: OperatorShape
  precedence: Precendence
}

type NumericString = string & {}
type ObjectString = '{}'
type ArrayString = '[]'
type String = string & {}
type Value = NumericString | string | ObjectString | ArrayString

type Operand = Value

type UnaryOperation = {
  operator: Operator
  operand: Operand
}
type BinaryOperation = {
  operator: Operator
  left: Operand
  right: Operand
}
type TernaryOperation = {
  operator: Operator
  left: Operand
  middle: Operand
  right: Operand
}
type Operation = UnaryOperation | BinaryOperation | TernaryOperation

type RunOperation = (operation: Operation) => Value

type AlgorithmRunnerStatusIdle = 'idle'
type AlgorithmRunnerStatusRunning = 'running'
type AlgorithmRunnerStatusDone = 'done'
type AlgorithmRunnerStatus =
  | AlgorithmRunnerStatusIdle
  | AlgorithmRunnerStatusRunning
  | AlgorithmRunnerStatusDone

/** Make this generic at some point */
type IdleAlgorithmRunner = {
  status: AlgorithmRunnerStatusIdle
  execution: []
  algorithm: Algorithm
}
type ProgressAlgorithmRunner = {
  status: AlgorithmRunnerStatusRunning
  execution: AlgorithmStep[]
  algorithm: Algorithm
}
type DoneAlgorithmRunner = {
  status: AlgorithmRunnerStatusDone
  execution: AlgorithmStep[]
  algorithm: Algorithm
  result: unknown
}
type AlgorithmRunner =
  | IdleAlgorithmRunner
  | ProgressAlgorithmRunner
  | DoneAlgorithmRunner

type StartAlgorithm = (algorithm: Algorithm) => IdleAlgorithmRunner
type RunAlgorithm = (
  algorithm: IdleAlgorithmRunner | ProgressAlgorithmRunner,
) => ProgressAlgorithmRunner | DoneAlgorithmRunner
type RestartAlgorithm = (
  algorithm: ProgressAlgorithmRunner | DoneAlgorithmRunner,
) => IdleAlgorithmRunner

function StartAlgorithm(algorithm: Algorithm): AlgorithmRunner {
  return {
    status: 'idle',
    execution: [],
    algorithm,
  }
}

function* RunAlgorithm(
  algorithm: IdleAlgorithmRunner | ProgressAlgorithmRunner,
): ProgressAlgorithmRunner | DoneAlgorithmRunner {
  /** @TODO */
}

function RestartAlgorithm(
  algorithm: IdleAlgorithmRunner | ProgressAlgorithmRunner,
): IdleAlgorithmRunner {
  return {
    status: 'idle',
    execution: [],
    algorithm: algorithm.algorithm,
  }
}

export const Algorithm = {}
