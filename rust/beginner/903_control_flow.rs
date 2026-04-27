// [903] 제어 흐름 - Control Flow
// 레벨: 1 | if 표현식, loop, while, for로 흐름을 제어합니다

fn main(){
let s=85;
let g=if s>=80{"B"}else{"C"};
println!("{}",g);

let mut i=0;
loop{
i+=1;
if i==3{break;}
}
println!("{}",i);

let mut n=1;
while n<5{
print!("{} ",n);
n+=2;
}
println!();

for i in 1..4{
print!("{} ",i);
}
println!();

let mut v=vec![1,2];
while let Some(x)=v.pop(){
print!("{} ",x);
}
}
