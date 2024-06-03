

export function Topbar({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: any;
  }) {
    return (
      <div className="bg-graylumen-700 flex w-full p-1 py-2 fixed z-10">
        <div className="p-2 pl-3 flex items-center grow">
          <FontAwesomeIcon
            icon={faBars}
            className="cursor-pointer h-[20px]"
            onClick={(e) => {
              setOpen(true);
            }}
          />
        </div>
  
        <div className="absolute flex w-full justify-center -z-10">
          <Image src={IsoMainMateri} alt="foto de perfil" width={45} />
        </div>
        <div className="mt-1">
          <NavbarProfile home="/dashboard" />
        </div>
      </div>
    );
  }