import banner from '@/assets/images/download.jpeg';
import Bannar from '@/components/Bannar';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <Bannar />
      <div className="flex flex-row-reverse justify-between items-center m-14 max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            BOOK <br /> IS SOUL LIFE
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Gain knowledge throw learning
          </p>
          <div className="text-primary mt-20">
            <p>Books are like windows to a world of knowledge</p>
            <p>
              heir effectiveness lies in the clarity and depth of insights they
              provide.
            </p>
          </div>
          <Button className="mt-5" variant={'outline'}>
            About
          </Button>
        </div>
        <div className="relative -right-14 ">
          <img src={banner} alt="" />
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
