import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Skeleton Imagen */}
        <Skeleton className="h-[400px] md:h-[500px] w-full rounded-xl" />

        {/* Skeleton Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <Skeleton className="h-6 w-24 mb-4" /> {/* Badge */}
            <Skeleton className="h-10 w-full mb-2" /> {/* Título L1 */}
            <Skeleton className="h-10 w-2/3 mb-2" />  {/* Título L2 */}
            <Skeleton className="h-4 w-32" /> {/* Rating */}
          </div>

          <Skeleton className="h-12 w-32" /> {/* Precio */}

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <Skeleton className="h-px w-full my-4" /> {/* Separator */}

          <Skeleton className="h-12 w-full rounded-md" /> {/* Botón */}
        </div>
      </div>
    </div>
  );
}