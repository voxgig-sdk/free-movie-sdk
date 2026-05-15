package core

type FreeMovieError struct {
	IsFreeMovieError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFreeMovieError(code string, msg string, ctx *Context) *FreeMovieError {
	return &FreeMovieError{
		IsFreeMovieError: true,
		Sdk:              "FreeMovie",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FreeMovieError) Error() string {
	return e.Msg
}
