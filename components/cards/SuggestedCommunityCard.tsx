import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function SuggestedCommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className='p-2'>
      <div className='flex flex-wrap items-center gap-3'>
        <Link href={`/communities/${id}`} className='relative h-12 w-12'>

         <div className="flex justify-center items-center rounded-full overflow-hidden w-10 h-10">
         <Image
            src={imgUrl}
            alt='community_logo'
            fill
            className='object-cover'
          />
         </div>
        </Link>

        <div>
          <Link href={`/communities/${id}`}>
            <h4 className='text-base-semibold text-light-1'>{name}</h4>
          </Link>
          <p className='text-small-medium text-gray-1'>@{username}</p>
        </div>
      </div>

      <p className='mt-4 text-subtle-medium text-gray-1'>{bio}</p>

      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        <Link href={`/communities/${id}`} className="w-full">
          <Button size='sm' className='community-card_btn w-full'>
            View
          </Button>
        </Link>

        {members.length > 0 && (
          <div className='flex items-center'>
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && "-ml-2"
                } rounded-full object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className='ml-1 text-subtle-medium text-gray-1'>
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default SuggestedCommunityCard;