import { WhileStatement } from "typescript"
import { Expr, VariableExpr } from "./Expr"
import { Token } from "./Token"

export interface StmtVisitor<T> {
    visitExpressionStmt(stmt: ExpressionStmt): T
    visitPrintStmt(stmt: PrintStmt): T
    visitVarStmt(stmt: VarStmt): T
    visitBlockStmt(stmt: BlockStmt): T
    visitIfStmt(stmt: IfStmt): T
    visitWhileStmt(stmt: WhileStmt): T
    visitFunctionStmt(stmt: FunctionStmt): T
    visitReturnStmt(stmt: ReturnStmt): T
    visitClassStmt(stmt: ClassStmt): T
}

export abstract class Stmt {
    abstract accept<T>(visitor: StmtVisitor<T>): T
}

export class ExpressionStmt extends Stmt {

    constructor(public expression: Expr) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitExpressionStmt(this)
    }
}

export class PrintStmt extends Stmt {

    constructor(public expression: Expr) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitPrintStmt(this)
    }
}

export class VarStmt extends Stmt {

    constructor(public name: Token, public initializer?: Expr) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitVarStmt(this)
    }
}

export class ClassStmt extends Stmt {

    constructor(public name: Token, public superclass: VariableExpr | undefined, public methods: FunctionStmt[]) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitClassStmt(this)
    }
}

export class BlockStmt extends Stmt {

    constructor(public statements: Stmt[]) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitBlockStmt(this)
    }
}

export class IfStmt extends Stmt {

    constructor(public condition: Expr, public thenBranch: Stmt, public elseBranch?: Stmt) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitIfStmt(this)
    }
}

export class WhileStmt extends Stmt {

    constructor(public condition: Expr, public body: Stmt) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitWhileStmt(this)
    }
}
export class FunctionStmt extends Stmt {

    constructor(public name: Token, public params: Token[], public body: Stmt[]) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitFunctionStmt(this)
    }
}
export class ReturnStmt extends Stmt {

    constructor(public keyword: Token, public value?: Expr) {
        super()
    }

    accept<T>(visitor: StmtVisitor<T>) {
        return visitor.visitReturnStmt(this)
    }
}