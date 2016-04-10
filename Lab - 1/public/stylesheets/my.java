public class M{
	private E current;
	private S0 s0= new S0(this);
	private S1 s1= new S0(this);
	private S2 s2= new S0(this);
	private S3 s3= new S0(this);

	public M(){
		current = s0;
	}


	public E getCurrentState(){
		return current;
	}

	public void do_e1(){current.e1();}

	public void do_e2(){current.e1();}

	public void do_e3(){current.e1();}

}
