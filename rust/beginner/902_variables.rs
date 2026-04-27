// [902] 변수와 자료형 - Variables & Types
// 레벨: 1 | let, mut, 상수, 기본 자료형을 배웁니다

fn main(){
let x=5;
let mut y=10;y+=1;
const M:u32=100;

let s="   ";
let s=s.len();

let a:i8=-1;
let b:u8=2;
let c:i32=3;

println!("{}",x);
println!("{}",y);
println!("{}",M);
println!("{}",s);
println!("{} {} {}",a,b,c);

let f=3.1;
let g=2.7;
println!("{} {}",f,g);

let t=true;
let f2=false;
println!("{} {}",t,f2);

let ch='A';
println!("{}",ch);

let hex=0xff;
let bin=0b1010;
println!("{} {}",hex,bin);

let n=5;
println!("{}",n);
}
