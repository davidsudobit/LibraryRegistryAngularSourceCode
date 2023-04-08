import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

export class GlobalService{

    constructor(private url:string,private http:HttpClient){
    }

    post<T>(endPoint:string,resources:any):Observable<T>{
        return this.http.post<T>(this.url+endPoint,resources).pipe(
            catchError(this.handleError)
        );
    }

    put<T>(endPoint:string,resources:any):Observable<T>{
        return this.http.put<T>(this.url+endPoint,resources).pipe(
            catchError(this.handleError)
        );
    }

    patch<T>(endPoint:string,resources?:any,httpParams?:HttpParams):Observable<T>{
        return this.http.patch<T>(this.url+endPoint,resources,{
            params:httpParams
        }).pipe(
            catchError(this.handleError)
        );
    }

    delete<T>(endPoint:string,resources:any,body?:T):Observable<T>{
        return this.http.delete<T>(this.url+endPoint+resources).pipe(
            catchError(this.handleError)
        );
    }

    get<T>(endPoint:string,resources:any):Observable<T>{

        if(!resources) resources="";

        return this.http.get<T>(this.url+resources).pipe(
            catchError(this.handleError)
        );

    }

    getAll<T>(endPoint:string):Observable<T[]>{
        return this.http.get<T[]>(this.url+endPoint).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error:HttpErrorResponse):Observable<never>{

        if(error.status==208){
            return throwError("208");
        }
        else if(error.status==424){
            return throwError("424");
        }
        
        return throwError("500");

    }

}